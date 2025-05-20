import { sequelize } from "../db/index.js";
import Razorpay from "razorpay";
import crypto from "node:crypto";
import dotenv from "dotenv";


dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const placeOrder = async (req, res) => {
  const { user_id, items, total_amount, address_id, is_used, coupon_code , payment_method} =
    req.body;

  

  if (!user_id || !items?.length || !total_amount || !address_id || !payment_method) {
    return res.status(400).json({ error: "Invalid order details" });
  }

  const transaction = await sequelize.transaction(); // Start transaction

  try {
    // 1️⃣ Insert order
    const [orderResult] = await sequelize.query(
      `INSERT INTO orders (user_id, total_amount, address_id, payment_status , payment_method) 
       VALUES (:user_id, :total_amount, :address_id, 'Pending' , :payment_method) RETURNING id`,
      {
        replacements: { user_id, total_amount, address_id  , payment_method},
        transaction,
      }
    );

    const order_id = orderResult[0].id; // Get the new order ID

    // 2️⃣ Insert all order items in bulk
    const replacements = { order_id };
    let totalAmount = 0;

    items.forEach((item, index) => {
      replacements[`product_id${index}`] = item.product_id;
      replacements[`quantity${index}`] = item.quantity;
      replacements[`price${index}`] = item.price;
      totalAmount += item.price * item.quantity;
    });

    const orderItemsQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
      ${items
        .map(
          (_, index) =>
            `(:order_id, :product_id${index}, :quantity${index}, :price${index})`
        )
        .join(", ")}`;

    await sequelize.query(orderItemsQuery, { replacements, transaction });

    // 3️⃣ Update reward points
    const rewardPoints = Math.floor(totalAmount / 50);


    const updateRewardQuery = `
        UPDATE customers 
        SET reward_points = 
          CASE 
            WHEN reward_points + :rewardPoints >= 200 THEN (reward_points + :rewardPoints) - 200
            ELSE reward_points + :rewardPoints 
          END
        WHERE id = :user_id RETURNING reward_points , (reward_points + :rewardPoints) >= 200 AS earned_coupon;`;

    const result = await sequelize.query(updateRewardQuery, {
      replacements: { rewardPoints, user_id },
      type: sequelize.QueryTypes.UPDATE,
    });

    // 4️⃣ Give a coupon if points reached 200
    if (result[0][0]?.earned_coupon) {
      const couponCode = generateCoupon();
      await sequelize.query(
        `INSERT INTO coupons (user_id, code, discount) VALUES (:user_id, :couponCode, 10)`,
        { replacements: { user_id, couponCode } }
      );
    }

    function generateCoupon() {
      return `SHOE-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    }

    // 5️⃣ Handle coupon update if used
    if (is_used) {
      await sequelize.query(
        `UPDATE coupons SET is_used = TRUE WHERE code = :coupon_code AND user_id = :user_id`,
        {
          replacements: { coupon_code, user_id },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
    }

    await transaction.commit();

    // ✅ Create Razorpay Order
    const options = {
      amount: total_amount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${order_id}`.substring(0, 40),
    };
    const razorpayOrder = await razorpay.orders.create(options);

    return res.status(201).json({
      message: "Order placed successfully",
      order_id,
      razorpayOrder,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Place order error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    order_id,
  } = req.body;

  // ✅ Verify Razorpay Signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid payment signature" });
  }

  try {
    // ✅ Update Order Status to 'Paid'
    await sequelize.query(
      `UPDATE orders SET payment_status = 'Paid' WHERE id = :order_id`,
      { replacements: { order_id } }
    );

    res.json({ success: true, message: "Payment verified" });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};



export const getOrderDetails = async (req, res) => {
  const { order_id } = req.params;

  try {
    const [order] = await sequelize.query(
      `SELECT * FROM orders WHERE id = :order_id`,
      { replacements: { order_id } }
    );

    if (order.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const [orderItems] = await sequelize.query(
      `SELECT order_items.*, products.name, products.main_image_link 
       FROM order_items 
       JOIN products ON order_items.product_id = products.id 
       WHERE order_id = :order_id`,
      { replacements: { order_id } }
    );

    res.json({ order: order[0], items: orderItems });
  } catch (error) {
    console.error("Get order details error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const cancelOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    // Check if order exists
    const [order] = await sequelize.query(
      `SELECT * FROM orders WHERE id = :order_id`,
      { replacements: { order_id } }
    );

    if (order.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete order items first (cascading delete)
    await sequelize.query(
      `DELETE FROM order_items WHERE order_id = :order_id`,
      { replacements: { order_id } }
    );

    // Delete order
    await sequelize.query(`DELETE FROM orders WHERE id = :order_id`, {
      replacements: { order_id },
    });

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await sequelize.query(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );

    res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [orders] = await sequelize.query(
      `SELECT * FROM orders WHERE user_id = :user_id ORDER BY created_at DESC`,
      { replacements: { user_id } }
    );

    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
// processing , shipped , deliver
export const updateOrderStatus = async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body; // Expected status: "Processing", "Shipped", "Delivered", etc.

  if (!status) {
    return res.status(400).json({ error: "Order status is required" });
  }

  try {
    // Check if order exists
    const [order] = await sequelize.query(
      `SELECT * FROM orders WHERE id = :order_id`,
      { replacements: { order_id } }
    );

    if (order.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order status
    await sequelize.query(
      `UPDATE orders SET status = :status WHERE id = :order_id`,
      { replacements: { status, order_id } }
    );

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

 
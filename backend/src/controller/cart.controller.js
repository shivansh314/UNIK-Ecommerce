import { sequelize } from "../db/index.js";


// ✅ Add to Cart or Update Quantity
export const addToCart = async (req, res) => {
  const { user_id, product_id, size } = req.body; // Get user_id, product_id, and size from request body

  try {
    // Check if the product already exists in the user's cart with the same size
    const [existingCartItem] = await sequelize.query(
      `SELECT id, quantity FROM cart WHERE user_id = :user_id AND product_id = :product_id AND size = :size`,
      {
        replacements: { user_id, product_id, size },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (existingCartItem) {
      // Product exists → Update quantity (+1)
      await sequelize.query(
        `UPDATE cart SET quantity = quantity + 1 WHERE id = :id`,
        {
          replacements: { id: existingCartItem.id },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
      res.json({ message: "Quantity updated successfully" });
    } else {
      // Product doesn't exist → Insert new item
      await sequelize.query(
        `INSERT INTO cart (user_id, product_id, size, quantity) VALUES (:user_id, :product_id, :size, 1)`,
        {
          replacements: { user_id, product_id, size },
          type: sequelize.QueryTypes.INSERT,
        }
      );
      res.json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// ✅ Get Cart Items for a User
export const getCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [cartItems] = await sequelize.query(
      `SELECT cart.id ,cart.size , cart.product_id , cart.quantity, products.name, products.cost, products.main_image_link 
       FROM cart 
       JOIN products ON cart.product_id = products.id 
       WHERE cart.user_id = :user_id`,
      {
        replacements: { user_id },
      }
    );

    res.json(cartItems);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Update Cart Item Quantity
export const updateCart = async (req, res) => {

  const { product_id , quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    const [updatedCart] = await sequelize.query(
      `UPDATE cart SET quantity = :quantity WHERE product_id = :product_id RETURNING *`,
      {
        replacements: { quantity, product_id },
      }
    );

    if (updatedCart.length === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json(updatedCart[0]);
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Remove Product from Cart
export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const [deletedCartItem] = await sequelize.query(
      `DELETE FROM cart WHERE id = :id RETURNING *`,
      {
        replacements: { id },
      }
    );

    if (deletedCartItem.length === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

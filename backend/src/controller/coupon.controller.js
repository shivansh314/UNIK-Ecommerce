

import { sequelize } from "../db/index.js";

export const verifyCoupon = async (req, res) => {
  const { user_id, coupon_code } = req.query;

  console.log(req.query);
  

  if (!coupon_code) {
    return res.status(400).json({ error: "Coupon code is required" });
  }
  try {
    // 1️⃣ Check if the coupon exists and is expired
    const coupon = await sequelize.query(
      `SELECT * FROM coupons WHERE code = :coupon_code AND user_id = :user_id LIMIT 1`,
      {
        replacements: { coupon_code, user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // 2️⃣ Handle Expired Coupon
    if (!coupon) {
      return res.status(404).json({ error: "Invalid coupon code." });
    }

    
    if (coupon[0].expires_at < new Date()) {
      return res.status(400).json({ error: "Coupon has expired." });
    }

    return res.status(200).json({
      message: "Coupon verified successfully!",
      discount: coupon[0].discount,
      expires_at : coupon[0].expires_at ,
      is_used : coupon[0].is_used
    });
  } catch (error) {
    console.error("Coupon verification error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

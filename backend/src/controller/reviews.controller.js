import { sequelize } from "../db/index.js";
import { QueryTypes } from "sequelize";
import axios from "axios";


// **1. Add a Review**

const ML_API_BASE_URL = "http://127.0.0.1:3000"; // Ensure this matches your ML server's actual port

export const addReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, full_review } = req.body;

    if (!user_id || !product_id || !rating || !full_review) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Use Axios to make requests
    const [summaryResponse, sentimentResponse] = await Promise.all([
      axios.post(`${ML_API_BASE_URL}/summarize`, { text: full_review }),
      axios.post(`${ML_API_BASE_URL}/sentiment`, { text: full_review }),
    ]);

    const summary = summaryResponse.data.summary;
    const sentiment_score = sentimentResponse.data.sentiment_score;

    // Insert review into database
    const [newReview] = await sequelize.query(
      `INSERT INTO reviews (user_id, product_id, rating, summary, full_review, sentiment_score, created_at)
       VALUES (:user_id, :product_id, :rating, :summary, :full_review, :sentiment_score, NOW())
       RETURNING *`,
      {
        replacements: {
          user_id,
          product_id,
          rating,
          summary,
          full_review,
          sentiment_score,
        },
        type: QueryTypes.INSERT,
      }
    );

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **2. Fetch Paginated Reviews (Initially 5, Load More on Scroll)**
export const getProductReviews = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { page = 1, limit = 5 } = req.query; // Default: first 5 reviews

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const offset = (page - 1) * limit;

    const reviews = await sequelize.query(
      `SELECT * FROM reviews WHERE product_id = :product_id
       ORDER BY created_at DESC
       LIMIT :limit OFFSET :offset`,
      {
        replacements: {
          product_id,
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// **3. Fetch Top Reviews (Highest Rating & Most Liked)**
export const getTopReviews = async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const reviews = await sequelize.query(
      `SELECT * FROM reviews WHERE product_id = :product_id
       ORDER BY rating DESC, likes_count DESC
       LIMIT 5`,
      {
        replacements: { product_id },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// **4. Fetch Recent Reviews (Sorted by Newest First)**
export const getRecentReviews = async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const reviews = await sequelize.query(
      `SELECT * FROM reviews WHERE product_id = :product_id
       ORDER BY created_at DESC
       LIMIT 5`,
      {
        replacements: { product_id },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// **Fetch All Reviews**
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await sequelize.query(
      `SELECT * FROM reviews ORDER BY created_at DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ message: "Server error while fetching reviews." });
  }
};
 
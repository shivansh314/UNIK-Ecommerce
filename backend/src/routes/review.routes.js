import express from "express";
import {
  addReview,
  getProductReviews,
  getTopReviews,
  getRecentReviews,
  getAllReviews
} from "../controller/reviews.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview);
reviewRouter.get("/product/:product_id", getProductReviews);
reviewRouter.get("/topreviews/:product_id", getTopReviews);
reviewRouter.get("/recentreview/:product_id", getRecentReviews);
reviewRouter.get("/getallreview", getAllReviews);

export default reviewRouter;

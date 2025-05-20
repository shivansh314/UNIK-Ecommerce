import express from "express";
import {
  getAllProducts,

  getFilteredProducts,
  getProductById,
} from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/filter", getFilteredProducts);
productRouter.get("/:id", getProductById);


export default productRouter;

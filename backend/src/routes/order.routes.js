import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  getAllOrders ,
  verifyPayment
} from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", placeOrder);
orderRouter.get("/getuserorders/:user_id", getUserOrders);
orderRouter.get("/details/:order_id", getOrderDetails);
orderRouter.get("/getallorders"  , getAllOrders)
orderRouter.post("/verify", verifyPayment);

export default orderRouter;

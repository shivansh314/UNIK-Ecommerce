import express from "express";
import { verifyCoupon } from "../controller/coupon.controller.js";


const couponRouter = express.Router();

couponRouter.get("/", verifyCoupon);

export default couponRouter;
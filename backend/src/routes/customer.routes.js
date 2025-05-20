import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllCustomers,
  getCustomerById,
  getCurrentUser , 
  updateUserById
} from "../controller/customer.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT , logoutUser);
router.route("/me").get(verifyJWT, getCurrentUser);

// Customer Routes
router.get("/customers", getAllCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/update/:id" , updateUserById);
export default router;

import express from "express";
import {
  addAddress,
  getAddressbyid,
  getAddressByUserId,
  updateAddress,
} from "../controller/address.controller.js";

const addressrouter = express.Router();

addressrouter.post("/", addAddress);
addressrouter.post("/update/:id", updateAddress);
addressrouter.get("/:user_id/:address_id" , getAddressbyid)
addressrouter.get("/:user_id", getAddressByUserId);

export default addressrouter;
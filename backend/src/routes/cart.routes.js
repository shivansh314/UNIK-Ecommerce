import express from "express";

import {
    addToCart , getCart , updateCart , removeFromCart 
} from "../controller/cart.controller.js"


const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/:user_id", getCart);
cartRouter.put("/:cartItemId", updateCart);
cartRouter.delete("/delete/:id", removeFromCart);

export default cartRouter

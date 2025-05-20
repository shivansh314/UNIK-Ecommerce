import express from "express"

import { sendOrderReceipt } from "../controller/receipt.controller.js";
const receiptRouter = express.Router();


receiptRouter.post("/send-receipt", sendOrderReceipt);

export default receiptRouter;
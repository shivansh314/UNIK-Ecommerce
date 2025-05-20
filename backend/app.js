import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use() - this is used to define middleware that runs on every request regardless of the method

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8000"], // ✅ Allow both frontend & backend
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());


//routes
import router from "./src/routes/customer.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import productRouter from "./src/routes/product.routes.js";
import addressrouter from "./src/routes/address.routes.js";
import couponRouter from "./src/routes/coupon.routes.js";
import reviewRouter from "./src/routes/review.routes.js";
import receiptRouter from "./src/routes/receipt.routes.js";
// customer routes 
app.use("/api/v1/customers", router); 

//cart routes
app.use("/api/v1/cart" , cartRouter )

//coupon router 
app.use("/api/v1/coupon" , couponRouter)

// order routes 
app.use("/api/v1/order" , orderRouter)

//product routes 
app.use("/api/v1/products" , productRouter)

//address routes
app.use("/api/v1/address" , addressrouter)

//review routes 
app.use("/api/v1/review" , reviewRouter)

// receipt routes
app.use("/api/v1/receipt" , receiptRouter)

export { app };

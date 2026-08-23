import 'reflect-metadata';
import express from "express";
import "./Database/connection";
import userRoute from "./route/userRoute";
import categoryRoute from "./route/categoryRoute";
import productRoute from './route/productRouter';
 
const app = express();
app.use(express.json());

//localhost:300/api/auth/
app.use("/api/auth", userRoute);
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)

app.get("/", (req, res) => {
  res.send("Digital Dokan");
});

export default app;
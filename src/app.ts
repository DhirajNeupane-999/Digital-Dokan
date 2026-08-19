import 'reflect-metadata';
import express from "express";
import "./Database/connection";
import userRoute from "./route/userRoute";

const app = express();
app.use(express.json());
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Digital Dokan");
});

export default app;
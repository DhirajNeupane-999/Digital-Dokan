import express from "express";
import "./Database/connection";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Digital Dokan");
});

export default app;
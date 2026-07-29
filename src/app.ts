import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Digital Dokan");
});

export default app;
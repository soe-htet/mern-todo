import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import todoRouter from "./routers/todoRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  return res.json({ message: "Hello" });
});

app.use("/api/v1/todo", todoRouter);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
  })
  .catch((err) => {
    process.exit(1);
  });

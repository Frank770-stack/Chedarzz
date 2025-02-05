import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());

//MIDDLEWARE

app.use(express.json());
app.use(cookieParser());
//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/loans", loanRoutes);

//START SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

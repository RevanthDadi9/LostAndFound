import "./configEnv.js";
import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRoutes.js";



const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://lostandfound-frontend-v1ei.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/user", userRouter);
app.use("/item", itemRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT || 5000, () => {
      console.log(`Listening on port: ${PORT || 5000}!`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

start();

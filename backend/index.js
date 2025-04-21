import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/user", userRouter);
app.use("/item", itemRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
    console.log("Connected to MongoDB");

    app.listen(PORT || 5000, () => {
      console.log(`Listening on port: ${PORT || 5000}!`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

start();

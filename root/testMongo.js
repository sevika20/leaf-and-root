import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connection is working!");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB Atlas connection failed:", err);
    process.exit(1);
  });

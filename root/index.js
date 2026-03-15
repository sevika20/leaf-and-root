import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; 

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Connect MongoDB & start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));


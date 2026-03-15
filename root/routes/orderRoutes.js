import express from "express";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders -> Create COD order
router.post("/", createOrder);

export default router;





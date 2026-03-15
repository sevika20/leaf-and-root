// routes/productRoutes.js
import express from "express";
import { createProduct, getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// POST → create product
router.post("/", createProduct);

// GET → all products
router.get("/", getProducts);

// GET → single product by id
router.get("/:id", getProductById);

// ✅ Export correctly
export default router;

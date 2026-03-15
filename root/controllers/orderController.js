 // controllers/orderController.js
// controllers/orderController.js
import mongoose from "mongoose";
import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod, customerDetails, type } = req.body;

    // Validation
    if (!products || !Array.isArray(products) || products.length === 0)
      return res.status(400).json({ message: "No products provided" });

    if (!customerDetails?.name || !customerDetails?.phone || !customerDetails?.address)
      return res.status(400).json({ message: "Missing customer details" });

    // ✅ Correct way to convert string IDs to ObjectId
    const productsWithIds = products.map(p => ({
      product: new mongoose.Types.ObjectId(p.product), // Use 'new'
      quantity: p.quantity || 1,
    }));

    const newOrder = new Order({
      user: null, // guest checkout
      products: productsWithIds,
      totalAmount,
      paymentMethod: paymentMethod || "Cash on Delivery",
      customerDetails,
      type: type || "plant",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("CreateOrder error:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

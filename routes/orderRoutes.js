import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/orders", adminAuth, getAllOrders);
router.get("/orders/:id", adminAuth, getOrderById);
router.post("/orders", adminAuth, createOrder);
router.put("/orders/:id", adminAuth, updateOrderStatus);
router.delete("/orders/:id", adminAuth, deleteOrder);

export default router;

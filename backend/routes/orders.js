import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  payOrder,
} from "../controllers/orders.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/", authHandler, createOrder);
router.get("/", authHandler, getUserOrders);
router.get("/:id", authHandler, getOrderById);
router.put("/:id", authHandler, payOrder);

export default router;

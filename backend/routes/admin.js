import express from "express";
import {
  createProduct,
  editProduct,
  getAllProducts,
  getProductById,
  getAllOrders,
  getAllUsers,
  deliverOrder,
  deleteProduct,
  makeAdminUser,
} from "../controllers/admin.js";
import { authHandler, adminHandler } from "../middleware/authHandler.js";
import { multerConfig, uploadImage } from "../controllers/uploads.js";

const router = express.Router();

router.get("/products/:id", authHandler, adminHandler, getProductById);
router.get("/products", authHandler, adminHandler, getAllProducts);
router.post("/products", authHandler, adminHandler, createProduct);
router.put("/products/:id", authHandler, adminHandler, editProduct);
router.put(
  "/uploads",
  authHandler,
  adminHandler,
  multerConfig.single("image"),
  uploadImage
);
router.delete("/products/:id", authHandler, adminHandler, deleteProduct);

router.get("/orders", authHandler, adminHandler, getAllOrders);
router.put("/orders/:id", authHandler, adminHandler, deliverOrder);

router.get("/users", authHandler, adminHandler, getAllUsers);
router.put("/users/:id", authHandler, adminHandler, makeAdminUser);

export default router;

import express from "express";
import { getAllProductById, getAllProducts } from "../controllers/products.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getAllProductById);

export default router;

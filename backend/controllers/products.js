import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

// Path     /api/products
// Type     GET
// Access   Public
// Desc     Get All Products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true });
  return res.json(products);
});

// Path     /api/products/:id
// Type     GET
// Access   Public
// Desc     Get Product by Id
export const getAllProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product && product.isActive) {
    return res.json(product);
  } else {
    res.statusCode = 404;
    throw new Error("Product not Found.");
  }
});
export const updateCountInStock = async (productId, qty) => {
  const product = await Product.findById(productId);
  if (product) {
    product.countInStock = product.countInStock - qty;
    await product.save();
  }
};

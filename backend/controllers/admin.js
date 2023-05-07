import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import Order from "../models/order.js";
import User from "../models/user.js";

// Path         /api/admin/products
// Type         GET
// Access       Private
// Desc         Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isDelete: false });
  return res.json(products);
});

// Path         /api/admin/products/:id
// Type         GET
// Access       Private
// Desc         Get product by id
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else {
    res.statusCode = 404;
    throw new Error("Product Not Found.");
  }
});

// Path         /api/admin/products
// Type         Post
// Access       Private
// Desc         Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Sample Product",
    image: "",
    description: "",
    color: "",
    category: "",
    fabric: "",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    isActive: false,
    isDelete: false,
  });

  const createdProduct = await product.save();
  res.statusCode = 201;
  return res.json({ _id: createdProduct._id });
});

// Path         /api/admin/products/:id
// Type         Put
// Access       Private
// Desc         Update Product
export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    const {
      name,
      price,
      description,
      category,
      color,
      fabric,
      countInStock,
      image,
      isActive,
    } = req.body;

    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.color = color;
    product.fabric = fabric;
    product.countInStock = countInStock;
    product.image = image;
    product.isActive = isActive;
    product.user = req.user._id;

    await product.save();

    return res.json({
      message: "Success",
    });
  } else {
    res.statusCode = 404;
    throw new Error("Product not Found.");
  }
});

// Path         /api/admin/products/:id
// Type         Put
// Access       Private
// Desc         Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    product.isDelete = true;

    await product.save();

    res.statusCode = 200;

    return res.json({
      message: "Product Deleted Successfully",
    });
  } else {
    res.statusCode = 404;
    throw new Error("Product not Found.");
  }
});

// Path         /api/admin/orders
// Type         Get
// Access       Private
// Desc         Get User Orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  return res.json(orders);
});

// Path         /api/admin/orders
// Type         PUT
// Access       Private
// Desc         Deliver Order
export const deliverOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order && order.isPaid) {
    const { status } = req.body;

    order.isDelivered = status;
    order.deliveredAt = new Date();

    await order.save();

    res.statusCode = 200;

    return res.json({
      message: "Order Delivered Successfully",
    });
  } else {
    res.statusCode = 402;
    throw new Error("Payment Required.");
  }
});

// Path         /api/admin/users
// Type         Get
// Access       Private
// Desc         Get all Users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

// Path         /api/admin/users/:id
// Type         PUT
// Access       Private
// Desc         Make Admin Users
export const makeAdminUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user && !user.isAdmin) {
    const { status } = req.body;

    user.isAdmin = status;

    await user.save();

    res.statusCode = 200;

    return res.json({
      message: "Success",
    });
  } else {
    res.statusCode = 404;
    throw new Error("User not Found.");
  }
});

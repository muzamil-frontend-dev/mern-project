import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../models/order.js";
import { updateCountInStock } from "./products.js";

// path     /api/orders
// type     Get
// Access   Private
// Desc     Get User Orders
export const getUserOrders = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const orders = await Order.find({ user });
  return res.json(orders);
});

// path     /api/orders
// type     Get
// Access   Private
// Desc     Get Order By Id
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");
  if (order && order.user._id.toString() === req.user._id.toString()) {
    return res.json(order);
  } else {
    res.statusCode = 404;
    throw new Error("Order not Found.");
  }
});

// path     /api/orders
// type     Post
// Access   Private
// Desc     Create New Order
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemsPrice,
    paymentType,
  } = req.body;

  const order = new Order({
    orderItems,
    shippingAddress,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemsPrice,
    paymentType,
    user: req.user._id,
  });

  const createdOrder = await order.save();
  res.statusCode = 201;
  return res.json({ _id: createdOrder._id });
});

// path     /api/orders/:id
// type     Put
// Access   Private
// Desc     Pay Order
export const payOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found.");
  }

  if (order && order.user.toString() !== req.user._id.toString()) {
    res.statusCode = 400;
    throw new Error("You do not have permission to pay this order.");
  }

  const paymentMethod = req.body;
  const stripe = new Stripe(
    "sk_test_51MpXqSEkCYnmWLlnUoKUqGgW7Z9uDsPvG6UsYGJTZg0G91f5U7znX83qmpqMSACVBAJ9qiK6HLtYSVs1gCmhztYK00GfKnC8oU"
  );
  console.log(paymentMethod);

  await stripe.paymentIntents.create({
    payment_method: paymentMethod.id,
    confirm: true,
    amount: order.totalPrice * 100,
    currency: "PKR",
    description: `${order._id} : ${req.user.name} (${req.user.email}) purchased ${order.orderItems.length} product(s).`,
  });

  order.paymentMethod = paymentMethod;
  order.isPaid = true;
  order.paidAt = new Date();

  await order.save();

  order.orderItems.forEach(async (orderItem) => {
    await updateCountInStock(orderItem.product, orderItem.qty);
  });

  res.statusCode = 200;

  return res.json({
    message: "Order paid Successfully.",
  });
});

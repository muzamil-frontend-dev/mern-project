import mongoose from "mongoose";

const productsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Product name is required"],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: String,
    },
    fabric: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("Product", productsSchema);
export default Product;

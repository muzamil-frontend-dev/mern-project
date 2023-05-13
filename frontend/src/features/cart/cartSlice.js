import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const addressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];
const paymentFromStorage = localStorage.getItem("paymentType")
  ? JSON.parse(localStorage.getItem("paymentType"))
  : [];

const initialState = {
  loading: false,
  error: null,
  cartItems: cartItemsFromStorage,
  shippingAddress: addressFromStorage,
  paymentType: paymentFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.loading = true;
      let cartItem = payload;
      let exist = state.cartItems.find(
        (item) => item.product === cartItem.product
      );
      if (exist) {
        // update
        state.cartItems = state.cartItems.map((item) =>
          item.product === cartItem.product ? cartItem : item
        );
      } else {
        // add
        state.cartItems = [...state.cartItems, cartItem];
      }
      state.loading = false;
    },

    removeFromCart: (state, { payload }) => {
      const productId = payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productId
      );
    },

    setError: (state, { payload }) => {
      state.error = payload;
    },

    addShipping: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.shippingAddress = payload;
    },

    addPayment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.paymentType = payload;
    },

    resetCart: (state) => {
      state.loading = false;
      state.error = null;
      state.cartItems = [];
      state.shippingAddress = null;
      state.paymentType = null;
    },
  },
});

const {
  addToCart,
  removeFromCart,
  setError,
  addShipping,
  addPayment,
  resetCart,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart;

export default cartSlice.reducer;

export const addCartItem = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    if (data.countInStock < qty) {
      throw new Error("Invalid Quantity");
    }
    let cartItem = {
      name: data.name,
      price: data.price,
      qty: Number(qty),
      countInStock: data.countInStock,
      image: data.image,
      product: data._id,
    };

    dispatch(addToCart(cartItem));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch(removeFromCart(id));
  localStorage.removeItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const addShippingAddress = (address) => (dispatch, getState) => {
  dispatch(addShipping(address));
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().cart.shippingAddress)
  );
};

export const addPaymentType = (type) => (dispatch, getState) => {
  dispatch(addPayment(type));
  localStorage.setItem(
    "paymentType",
    JSON.stringify(getState().cart.paymentType)
  );
};

export const resetUserCart = () => async (dispatch) => {
  dispatch(resetCart());
  localStorage.removeItem("paymentType");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("cartItems");
};

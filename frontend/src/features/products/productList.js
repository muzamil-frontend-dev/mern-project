import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  all_products: [],
  filter_products: [],
  filters: {
    text: "",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
  },
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.all_products = [];
      state.filter_products = [];
      state.error = null;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      const priceArr = payload.map((element) => element.price);
      const maxPrice = Math.max(...priceArr);
      state.all_products = payload;
      state.filter_products = payload;
      state.filters = { ...state.filters, maxPrice, price: maxPrice };
      state.error = null;
    },
    setFilters: (state, { payload }) => {
      const { name, value } = payload;
      state.filters = { ...state.filters, [name]: value };
    },
    filterProducts: (state) => {
      let products = [...state.all_products];

      const { text, category, color, price } = state.filters;
      if (text) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(text)
        );
      }
      if (category && category !== "all") {
        products = products.filter((product) => product.category === category);
      }
      if (color && color !== "all") {
        products = products.filter((product) => product.color.includes(color));
      }
      if (price) {
        products = products.filter((product) => product.price <= price);
      }
      state.filter_products = products;
    },
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        text: "",
        category: "all",
        color: "all",
        minPrice: 0,
        maxPrice: state.filters.maxPrice,
        price: state.filters.maxPrice,
      };
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.all_products = [];
      state.filter_products = [];
      state.error = payload;
    },
  },
});

const {
  setLoading,
  setProducts,
  setFilters,
  filterProducts,
  clearFilters,
  setError,
} = productListSlice.actions;

export const productListSelector = (state) => state.productList;

export default productListSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/api/products");
    dispatch(setProducts(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const filterProductsList = (name, value) => async (dispatch) => {
  dispatch(setFilters({ name, value }));
  dispatch(filterProducts());
};
export const clearProductFilters = () => async (dispatch) => {
  dispatch(clearFilters());
};

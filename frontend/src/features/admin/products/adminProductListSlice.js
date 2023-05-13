import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../../auth/loginSlice.js";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const adminProductListSlice = createSlice({
  name: "adminProductsList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.products = [];
      state.error = payload;
    },
  },
});

const { setLoading, setProducts, setError } = adminProductListSlice.actions;

export const adminProductsListSelector = (state) => state.adminProductsList;

export default adminProductListSlice.reducer;

export const getProductsList = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.get("/api/admin/products", config);
    dispatch(setProducts(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    if (error.response && error.response.status === 401) {
      dispatch(logoutUser());
    }
    dispatch(setError(error));
  }
};

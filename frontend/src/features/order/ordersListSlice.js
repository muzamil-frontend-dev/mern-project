import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../auth/loginSlice";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersListSlice = createSlice({
  name: "ordersList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.orders = [];
      state.error = null;
    },
    setOrders: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.orders = [];
      state.error = payload;
    },
  },
});

const { setLoading, setOrders, setError } = ordersListSlice.actions;

export const ordersListSelector = (state) => state.ordersList;

export default ordersListSlice.reducer;

export const getOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.get("/api/orders", config);
    dispatch(setOrders(data));
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

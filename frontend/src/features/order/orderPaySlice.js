import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../auth/loginSlice";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const { setLoading, setSuccess, setError, reset } =
  orderPaySlice.actions;

export const orderPaySelector = (state) => state.orderPay;

export default orderPaySlice.reducer;

export const payOrder =
  (orderId, paymentMethod) => async (dispatch, getState) => {
    try {
      dispatch(setLoading());
      const { token } = getState().login.userInfo;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      await axios.put(`/api/orders/${orderId}`, paymentMethod, config);
      dispatch(setSuccess());
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

export const resetOrder = () => async (dispatch) => {
  dispatch(reset());
};

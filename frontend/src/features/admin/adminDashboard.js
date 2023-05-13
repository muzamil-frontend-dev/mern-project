import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../auth/loginSlice";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.items = [];
      state.error = null;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.items = [];
      state.error = payload;
    },
  },
});

const { setLoading, setItems, setError } = adminDashboardSlice.actions;

export const adminDashboardSelector = (state) => state.adminDashboard;

export default adminDashboardSlice.reducer;

export const getItems = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const [res1, res2, res3] = await Promise.all([
      axios.get("/api/admin/products", config),
      axios.get("/api/admin/orders", config),
      axios.get("/api/admin/users", config),
    ]);
    dispatch(setItems([res1.data, res2.data, res3.data]));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    if (err.response && err.response.status === 401) {
      dispatch(logoutUser());
    }
    dispatch(setError(error));
  }
};

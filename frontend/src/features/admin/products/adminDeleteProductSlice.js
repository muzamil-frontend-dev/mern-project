import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../../auth/loginSlice";

const initialState = {
  loading: false,
  status: null,
  error: null,
};

const adminDeleteProductSlice = createSlice({
  name: "adminDeleteProduct",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.status = null;
      state.error = null;
    },
    setStatus: (state, { payload }) => {
      state.loading = false;
      state.status = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.status = null;
      state.error = payload;
    },
  },
});

const { setLoading, setStatus, setError } = adminDeleteProductSlice.actions;

export const adminDeleteProductSelector = (state) => state.adminDeleteProduct;

export default adminDeleteProductSlice.reducer;

export const productDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());

    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/admin/products/${id}`, config);
    dispatch(setStatus(data));
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

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../../auth/loginSlice";

const initialState = {
  loading: false,
  product: null,
  error: null,
};

const adminProductDetailSlice = createSlice({
  name: "adminProductDetail",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.product = null;
      state.error = null;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.product = null;
      state.error = payload;
    },
  },
});

const { setLoading, setProduct, setError } = adminProductDetailSlice.actions;

export const adminProductDetailSelector = (state) => state.adminProductDetail;

export default adminProductDetailSlice.reducer;

export const getProductDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());

    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/admin/products/${id}`, config);
    dispatch(setProduct(data));
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

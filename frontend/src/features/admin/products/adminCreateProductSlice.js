import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../../auth/loginSlice";

const initialState = {
  loadingNew: false,
  productId: null,
  errorNew: null,
};

const adminCreateProductSlice = createSlice({
  name: "adminCreateProduct",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loadingNew = true;
      state.productId = null;
      state.errorNew = null;
    },
    setProductId: (state, { payload }) => {
      state.loadingNew = false;
      state.productId = payload;
      state.errorNew = null;
    },
    setError: (state, { payload }) => {
      state.loadingNew = false;
      state.productId = null;
      state.errorNew = payload;
    },
  },
});

const { setLoading, setProductId, setError } = adminCreateProductSlice.actions;

export const adminCreateProductSelector = (state) => state.adminCreateProduct;

export default adminCreateProductSlice.reducer;

export const createProduct = (navigate) => async (dispatch, getState) => {
  debugger;
  try {
    debugger;
    dispatch(setLoading());

    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/admin/products", {}, config);
    dispatch(setProductId(data._id));
    navigate(`/admin/products/${data._id}`);
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

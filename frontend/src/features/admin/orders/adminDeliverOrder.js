import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../../auth/loginSlice";

const initialState = {
  loading: false,
  status: null,
  error: null,
};

const adminOrderDeliverSlice = createSlice({
  name: "adminOrderDeliver",
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

const { setLoading, setStatus, setError } = adminOrderDeliverSlice.actions;

export const adminOrderDeliverSelector = (state) => state.adminOrderDeliver;

export default adminOrderDeliverSlice.reducer;

export const deliverOrder = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/orders/${id}`,
      { status },
      config
    );
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

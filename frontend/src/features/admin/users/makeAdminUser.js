import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../auth/loginSlice";
import axios from "axios";

const initialState = {
  loading: false,
  status: null,
  error: null,
};

const makeAdminUserSlice = createSlice({
  name: "makeAdminUser",
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

const { setLoading, setStatus, setError } = makeAdminUserSlice.actions;

export const makeAdminUserSelector = (state) => state.makeAdminUser;

export default makeAdminUserSlice.reducer;

export const adminUser = (status, id) => async (dispatch, getState) => {
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
      `/api/admin/users/${id}`,
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

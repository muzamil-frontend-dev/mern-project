import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfoByRegister } from "./loginSlice";

const initialState = {
  loading: false,
  success: null,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
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
      state.error = null;
      state.success = false;
    },
  },
});

const { setLoading, setSuccess, setError, reset } = registerSlice.actions;

export const registerSelector = (state) => state.register;

export default registerSlice.reducer;

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/auth/register",
      {
        name,
        email,
        password,
      },
      config
    );
    dispatch(setSuccess());
    //  data need to be add in login userInfo
    dispatch(setUserInfoByRegister(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const resetUser = () => async (dispatch) => {
  dispatch(reset());
};

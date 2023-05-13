import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetUserCart } from "../cart/cartSlice";

let userInfoFromStorage = null;
try {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} catch (error) {
  userInfoFromStorage = null;
}

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },

    setUserInfo: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    },

    setError: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.error = payload;
    },

    setLogout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

const { setLoading, setUserInfo, setError, setLogout } = loginSlice.actions;

export const loginSelector = (state) => state.login;

export default loginSlice.reducer;

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    let config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      config
    );
    dispatch(setUserInfo(data));
    localStorage.setItem("userInfo", JSON.stringify(getState().login.userInfo));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const setUserInfoByRegister = (userInfo) => async (dispatch) => {
  dispatch(setUserInfo(userInfo));
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLogout());
  dispatch(resetUserCart());
  localStorage.clear();
};

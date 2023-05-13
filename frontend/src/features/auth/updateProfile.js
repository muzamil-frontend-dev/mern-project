import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser, setUserInfoByRegister } from "./loginSlice";

const initialState = {
  loading: false,
  successs: null,
  error: null,
};

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.status = null;
      state.error = payload;
    },
  },
});

const { setLoading, setSuccess, setError } = updateProfileSlice.actions;

export const updateProfileSelector = (state) => state.updateProfile;

export default updateProfileSlice.reducer;

export const updateUserProfile =
  (id, name, password) => async (dispatch, getState) => {
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
        `/api/auth/updateUser/${id}`,
        { name, password },
        config
      );
      dispatch(setSuccess());
      //  data need to be add in login userInfo
      dispatch(setUserInfoByRegister(data));
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

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../../auth/loginSlice";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

const adminUsersListSlice = createSlice({
  name: "adminUsersList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.users = [];
      state.error = null;
    },
    setUsers: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.users = [];
      state.error = payload;
    },
  },
});

const { setLoading, setUsers, setError } = adminUsersListSlice.actions;

export const adminUsersListSelector = (state) => state.adminUsersList;

export default adminUsersListSlice.reducer;

export const getUsersList = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.get("/api/admin/users", config);
    dispatch(setUsers(data));
  } catch (err) {
    const error =
      err.reponse && err.response.data.message
        ? err.response.data.message
        : err.message;

    if (error.response && error.response.status === 401) {
      dispatch(logoutUser());
    }
    dispatch(setError(error));
  }
};

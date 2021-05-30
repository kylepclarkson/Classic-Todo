import axios from "axios";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

// CHECK FOR TOKEN, GET USER IF PRESENT
export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  axios
    .get("http://127.0.0.1:8000/api/auth/user", addTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // User is not authenticated
      //   dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Set request
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({
    username,
    password,
  });

  // make post request to login
  axios
    .post("http://127.0.0.1:8000/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // Failed to authenticate user
      //   dispatch(runErrors(err.response.data, err.response.status));
      console.log('login error', err)
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// === HELPER FUNCTIONS ===

// Add token to config (headers)
export const addTokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

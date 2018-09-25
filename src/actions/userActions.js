import axios from "axios";
import { b64EncodeUnicode } from "../helper/b64Encode";

const rootUrl = "https://api.github.com";

export const perPage = 10;

axios.defaults.baseURL = rootUrl;

var encodedId = sessionStorage.getItem("github-auth");

export const GetUserList = (user, page) => {
  return dispatch => {
    dispatch({
      type: "GET_USER_LIST"
    });
    return axios
      .get(`/search/users`, {
        headers: {
          Authorization: `Basic ${encodedId}`
        },
        params: {
          q: user,
          page: page,
          per_page: perPage
        }
      })
      .then(response => {
        dispatch({
          type: "GET_USER_LIST_SUCCESS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_USER_LIST_FAILED",
          payload: error
        });
      });
  };
};

export const GetUser = user => {
  return dispatch => {
    dispatch({
      type: "GET_USER"
    });
    return axios
      .get(`/users/${user}`, {
        headers: {
          Authorization: `Basic ${encodedId}`
        }
      })
      .then(response => {
        dispatch({
          type: "GET_USER_SUCCESS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_USER_FAILED",
          payload: error
        });
      });
  };
};


export const GetUserFollowers = (user) => {
  return dispatch => {
    dispatch({
      type: "GET_USER_FOLLOWERS"
    });
    return axios
      .get(`/users/${user}/followers`, {
        headers: {
          Authorization: `Basic ${encodedId}`
        },
        params: {
          page: 1,
          per_page: perPage
        }
      })
      .then(response => {
        dispatch({
          type: "GET_USER_FOLLOWERS_SUCCESS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_USER_FOLLOWERS_FAILED",
          payload: error
        });
      });
  };
};

export const CheckSession = () => {
  if (sessionStorage.getItem("github-auth")) {
    return dispatch => {
      dispatch({
        type: "GET_AUTH_SUCCESS"
      });
    };
  } else {
    return dispatch => {
      dispatch({
        type: "LOGOUT"
      });
    };
  }
};

export const CheckAuth = (userId, password) => {
  sessionStorage.setItem(
    "github-auth",
    b64EncodeUnicode(`${userId}:${password}`)
  );

  encodedId = sessionStorage.getItem("github-auth");

  return dispatch => {
    dispatch({
      type: "GET_AUTH"
    });
    return axios
      .get(`/authorizations`, {
        headers: {
          Authorization: `Basic ${encodedId}`
        }
      })
      .then(response => {
        dispatch({
          type: "GET_AUTH_SUCCESS",
          payload: response.status
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_AUTH_FAILED",
          payload: error.message
        });
      });
  };
};

export const Logout = () => {
  sessionStorage.removeItem("github-auth");
  alert("you have successfully logged out.");
  return dispatch => {
    dispatch({
      type: "LOGOUT"
    });
  };
};

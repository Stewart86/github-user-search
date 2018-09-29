import axios from "axios";
import { b64EncodeUnicode } from "../helper/b64Encode";
import { rootUrl, perPage } from "../helper/config";

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

export const GetUserFollowers = user => {
  return dispatch => {
    dispatch({
      type: "GET_USER_FOLLOWERS"
    });
    return axios
      .get(`/users/${user}/followers`, {
        headers: {
          Authorization: `Basic ${encodedId}`
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

export const GetUserFollowing = user => {
  return dispatch => {
    dispatch({
      type: "GET_USER_FOLLOWING"
    });
    return axios
      .get(`/users/${user}/following`, {
        headers: {
          Authorization: `Basic ${encodedId}`
        }
      })
      .then(response => {
        dispatch({
          type: "GET_USER_FOLLOWING_SUCCESS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_USER_FOLLOWING_FAILED",
          payload: error
        });
      });
  };
};

export const GetUserRepos = user => {
  return dispatch => {
    dispatch({
      type: "GET_USER_FOLLOWING"
    });
    return axios
      .get(`/users/${user}/repos`, {
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
          type: "GET_USER_REPOS_SUCCESS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_USER_REPOS_FAILED",
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
        sessionStorage.removeItem("github-auth");
        dispatch({
          type: "GET_AUTH_FAILED",
          payload: error
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

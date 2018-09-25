import axios from "axios";

const rootUrl = "https://api.github.com";

export const perPage = 10;

axios.defaults.baseURL = rootUrl;

export const GetUserList = (user, page) => {
  var encodedId = sessionStorage.getItem("github-auth");

  console.log(user, page);
  return dispatch => {
    dispatch({
      type: "GET_USER"
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

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      match,
      p1
    ) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

export const CheckSession = () => {
  if (sessionStorage.getItem("github-auth")) {
    return dispatch =>
      dispatch({
        type: "GET_AUTH_SUCCESS"
      });
  }
};

export const CheckAuth = (userId, password) => {
  sessionStorage.setItem(
    "github-auth",
    b64EncodeUnicode(`${userId}:${password}`)
  );
  var encodedId = sessionStorage.getItem("github-auth");

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

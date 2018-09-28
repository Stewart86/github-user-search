const initialState = {
  LoginButton: "login"
};

export const Auth = (state = initialState, action) => {
  switch (action.type) {
    case "GET_AUTH":
      return Object.assign({}, state, {
          LoginButton: "logging in.."
      });
    case "GET_AUTH_SUCCESS":
      return Object.assign({}, state, {
          LoginButton: "logout"
      });
      case "GET_AUTH_FAILED":
      alert(`Username or Password you have entered is incorrect. Please try again. Original message from server: ${action.payload}`)
      return Object.assign({}, state, {
          LoginButton: "login"
      })
      case "LOGOUT":
      return Object.assign({}, state, {
          LoginButton: "login"
      })

    default:
      return state;
  }
};

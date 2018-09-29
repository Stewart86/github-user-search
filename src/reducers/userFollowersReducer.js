const initialState = {
  followers: [],
  fetching: false,
  fetched: false,
  error: null
};

export const UserFollowers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_FOLLOWERS":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_USER_FOLLOWERS_SUCCESS":
      return Object.assign({}, state, {
        followers: action.payload,
        fetching: false,
        fetched: true
      });
    case "GET_USER_FOLLOWERS_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        fetching: false
      });
    default:
      return state;
  }
};

const initialState = {
  following: [],
  fetching: false,
  fetched: false,
  error: null
};

export const UserFollowing = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_FOLLOWING":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_USER_FOLLOWING_SUCCESS":
      return Object.assign({}, state, {
        following: action.payload,
        fetching: false,
        fetched: true
      });
    case "GET_USER_FOLLOWING_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        fetching: false
      });
    default:
      return state;
  }
};

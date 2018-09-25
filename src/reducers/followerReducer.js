const initialState = {
    followers: 0,
    fetching: false,
    fetched: false,
    error: null
  };
  
  export const Followers = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USER_FOLLOWER":
        return Object.assign({}, state, {
          fetching: true
        });
      case "GET_USER_FOLLOWER_SUCCESS":
        return Object.assign({}, state, {
          followers: action.payload,
          fetching: false,
          fetched: true
        });
      case "GET_USER_FOLLOWER_FAILED":
        return Object.assign({}, state, {
          error: action.payload
        });
      default:
        return state;
    }
  };
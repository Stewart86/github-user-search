const initialState = {
  repos: [],
  fetching: false,
  fetched: false,
  error: null
};

export const UserRepos = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_REPOS":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_USER_REPOS_SUCCESS":
      return Object.assign({}, state, {
        repos: action.payload,
        fetching: false,
        fetched: true
      });
    case "GET_USER_REPOS_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        fetching: false
      });
    default:
      return state;
  }
};

const initialState = {
    user: {},
    fetching: false,
    fetched: null
}

export const User = (state = initialState, action) => {
  switch (action.type) {

  case "GET_USER":
    return Object.assign({}, state, {
        fetching: true
    })

    case "GET_USER_SUCCESS":
    return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        user: action.payload
    })

    case "GET_USER_FAILED":
    return Object.assign({}, state, {
        fetching: false,
        fetched: false,
        error: action.payload
    })

  default:
    return state
  }
}

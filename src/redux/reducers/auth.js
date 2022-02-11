import storeConstants from '../constants/actionTypes'

const initialState = {
  token: '',
  isAuthenticated: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case storeConstants.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      }
    case storeConstants.RESET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    default:
      return state
  }
}
export default auth

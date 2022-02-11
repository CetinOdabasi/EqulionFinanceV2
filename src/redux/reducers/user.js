import storeConstants from '../constants/actionTypes'

const initialState = {
  user: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case storeConstants.USER_INFO:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export default user

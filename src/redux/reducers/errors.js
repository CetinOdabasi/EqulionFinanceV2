import storeConstants from '../constants/actionTypes'

const initialState = {
  msg: {},
  status: null,
}

const errors = (state = initialState, action) => {
  switch (action.type) {
    case storeConstants.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      }
    default:
      return state
  }
}
export default errors

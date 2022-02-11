import storeConstants from '../constants/actionTypes'

const initialState = {
  show: false,
  variant: '',
  delay: '',
  header: '',
  body: '',
}

const toastr = (state = initialState, { type, payload }) => {
  switch (type) {
    case storeConstants.SET_TOASTR:
      return {
        ...state,
        show: payload.show,
        variant: payload.variant,
        delay: payload.delay,
        header: payload.header,
        body: payload.body,
      }
    default:
      return state
  }
}

export default toastr

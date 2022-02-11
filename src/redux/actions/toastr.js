import storeConstants from '../constants/actionTypes'

const showToastr = (payload) => (dispatch) => {
  dispatch({
    type: storeConstants.SET_TOASTR,
    payload: {
      show: true,
      ...payload,
    },
  })
}

const closeToastr = (payload) => (dispatch) => {
  dispatch({
    type: storeConstants.SET_TOASTR,
    payload: {
      show: false,
      ...payload,
    },
  })
}

export { showToastr, closeToastr }

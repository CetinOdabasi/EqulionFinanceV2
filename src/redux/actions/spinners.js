import storeConstants from '../constants/actionTypes'

export const showLoader = () => (dispatch) => {
  dispatch({ type: storeConstants.SHOW_LOADER })
}

export const hideLoader = () => (dispatch) => {
  dispatch({ type: storeConstants.HIDE_LOADER })
}

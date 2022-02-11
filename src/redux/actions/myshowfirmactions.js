import storeConstants from '../constants/actionTypes'
import { tokenConfig } from './auth'
import httpService from '../../helpers/httpService'

const getMyFirms = () => (dispatch, getState) => {
  httpService(
    { method: 'get', path: '/myfirm/', config: tokenConfig(getState) },
    dispatch
  ).then((res) => {
    if (res) {
      dispatch({
        type: storeConstants.GET_MY_SHOW_FIRM,
        payload: res,
      })
    }
  })
}

export default getMyFirms

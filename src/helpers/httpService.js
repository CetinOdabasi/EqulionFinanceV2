import axios from 'axios'
import storeConstants from '../redux/constants/actionTypes'

const defaultOptions = {
  method: 'get',
}

const httpService = (options = defaultOptions, dispatch) => {
  if (options.method === 'get')
    options.params = { ...options.params, ...options.config }
  return axios[options.method](
    process.env.REACT_APP_REST_URL + options.path,
    options.params,
    options.config
  )
    .then((res) => res.data)
    .catch((err) => {
      dispatch({
        type: storeConstants.SET_TOASTR,
        payload: {
          show: true,
          variant: 'danger',
          delay: 5000,
          header: err.res,
          body: err.res,
        },
      })
      dispatch({
        type: storeConstants.RESET_TOKEN,
      })
    })
}

export default httpService

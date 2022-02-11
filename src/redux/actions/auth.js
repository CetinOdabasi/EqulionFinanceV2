import storeConstants from '../constants/actionTypes'
import httpService from '../../helpers/httpService'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  httpService(
    { method: 'post', path: '/user/', config: tokenConfig(getState) },
    dispatch
  ).then((res) => {
    if (res) {
      dispatch({
        type: storeConstants.USER_INFO,
        payload: res.data,
      })
    } else {
      dispatch({
        type: storeConstants.RESET_TOKEN,
      })
    }
  })
}

// LOGIN USER
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    const params = new URLSearchParams()
    params.append('username', email)
    params.append('password', password)

    // We call our helper function in order to centralize our error handling mechanism
    httpService(
      { method: 'post', path: '/loginn/', params, config },
      dispatch
    ).then((res) => {
      if (res) {
        dispatch({
          type: storeConstants.LOGIN_SUCCESS,
          payload: res,
        })
        dispatch({
          type: storeConstants.SET_TOASTR,
          payload: {
            show: true,
            variant: 'success',
            delay: 5000,
            header: 'Login Success',
            body: "You're logged in",
          },
        })
      } else {
        dispatch({
          type: storeConstants.RESET_TOKEN,
          payload: null,
        })
        dispatch({
          type: storeConstants.USER_INFO,
          payload: null,
        })
      }
    })
  }

// REGISTER USER
export const registration =
  ({
    business_description,
    city,
    email,
    company_web_site,
    your_role_at_the_company,
    first_name,
    last_name,
    company_name,
    password,
    password2,
  }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // Request Body
    const body = JSON.stringify({
      business_description,
      city,
      email,
      company_web_site,
      your_role_at_the_company,
      first_name,
      last_name,
      company_name,
      password,
      password2,
    })

    httpService(
      { method: 'post', path: '/registerr/', params: body, config },
      dispatch
    ).then((res) => {
      if (res) {
        dispatch({
          type: storeConstants.LOGIN_SUCCESS,
          payload: res,
        })
        dispatch({
          type: storeConstants.SET_TOASTR,
          payload: {
            show: true,
            variant: 'success',
            delay: 5000,
            header: 'Login Success',
            body: "You're logged in",
          },
        })
      } else {
        dispatch({
          type: storeConstants.RESET_TOKEN,
          payload: null,
        })
        dispatch({
          type: storeConstants.USER_INFO,
          payload: null,
        })
      }
    })
  }

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  httpService(
    { method: 'post', path: '/logout/', config: tokenConfig(getState) },
    dispatch
  ).then((res) => {
    if (res) {
      dispatch({ type: 'CLEAR_LEADS' })
      dispatch({
        type: storeConstants.RESET_TOKEN,
      })
    }
  })
}

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const { token } = getState().auth

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // If token, add to headers config
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
}

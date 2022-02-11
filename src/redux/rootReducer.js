import { combineReducers } from 'redux'
import auth from './reducers/auth'
import errors from './reducers/errors'
import myshowfirmReducer from './reducers/myshowfirmReducer'
import user from './reducers/user'
import toastr from './reducers/toastr'
import analysisDataReducer from './reducers/analysisDataReducer'

const rootReducer = combineReducers({
  auth,
  user,
  analysisDataReducer,
  errors,
  myfirm: myshowfirmReducer,
  toastr,
})
export default rootReducer

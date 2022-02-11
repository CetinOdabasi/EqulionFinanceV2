import storeConstants from '../constants/actionTypes'

const initialState = {
  myfirm: [],
}

const myshowfirmReducer = (state = initialState, action) => {
  switch (action.type) {
    case storeConstants.GET_MY_SHOW_FIRM:
      return {
        ...state,
        myfirm: action.payload,
      }
    case storeConstants.ADD_FINANCIAL_DATA:
      return {
        ...state,
        myfirm: [...state.leads, action.payload],
      }
    case storeConstants.ADD_REAL_DATA:
      return {
        ...state,
        myfirm: [...state.leads, action.payload],
      }
    case storeConstants.ADD_REAL_RAITING_VALUATION:
      return {
        ...state,
        myfirm: [...state.leads, action.payload],
      }
    case storeConstants.ADD_FINANCIAL_RAITING_VALUATION:
      return {
        ...state,
        myfirm: [...state.leads, action.payload],
      }
    default:
      return state
  }
}

export default myshowfirmReducer

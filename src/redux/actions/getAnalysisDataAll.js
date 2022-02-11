import storeConstants from '../constants/actionTypes'

// Real Analysis fetch action

export const fetchAllAnalysis = (data) => {
  return {
    type: storeConstants.GET_ANALYSIS_DATA_ALL,
    payload: data,
  }
}

export const fetchRealAnalysis = (data) => {
  return {
    type: storeConstants.GET_ANALYSIS_REAL_DATA,
    payload: data,
  }
}

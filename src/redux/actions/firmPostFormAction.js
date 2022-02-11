import storeConstants from '../constants/actionTypes'

export function createFirmPost(firm_background) {
  return {
    type: storeConstants.NEW_POST_FIRM_BACKGROUND,
    payload: firm_background,
  }
}

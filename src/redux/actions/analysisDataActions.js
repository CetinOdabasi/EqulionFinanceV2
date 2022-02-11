import storeConstants from '../constants/actionTypes'

// Real Analysis fetch action

export const fetchRealAnalysis = (data) => {
  return {
    type: storeConstants.GET_ANALYSIS_REAL_DATA,
    payload: data,
  }
}

export const firmBackgroundSelect = (newFirmbackground) => {
  return {
    type: storeConstants.FIRM_BACKGROUND_SELECT,
    payload: newFirmbackground,
  }
}

export const financialStatements = (data) => {
  return {
    type: storeConstants.REAL_FINANCIAL_STATEMENTS_FETCH_DATA,
    payload: data,
  }
}

export const fxPosition = (data) => {
  return { type: storeConstants.REAL_FX_POSITION_FETCH_DATA, payload: data }
}

export const maturityShortTerm = (data) => {
  return {
    type: storeConstants.REAL_MATURITY_SHORT_TERM_FETCH_DATA,
    payload: data,
  }
}

export const businessPlan = (data) => {
  return { type: storeConstants.REAL_BUSINESS_PLAN_FETCH_DATA, payload: data }
}

export const customScenario = (data) => {
  return { type: storeConstants.REAL_CUSTOM_SCENARIO_FETCH_DATA, payload: data }
}

export const getLastCustomScenarioAction = (data) => {
  return { type: storeConstants.GET_LAST_CUSTOM_SCENARIO, payload: data }
}

export const enableCustomScenario = () => {
  return { type: storeConstants.ENABLE_CUSTOM_SCENARIO }
}

export const disableCustomScenario = () => {
  return { type: storeConstants.DISABLE_CUSTOM_SCENARIO }
}

export const disableButton = (lastYearDisabled) => {
  return { type: storeConstants.DISABLE_BUTTON, payload: lastYearDisabled }
}

export const disableButtonFx = (lastYearDisabled) => {
  return { type: storeConstants.DISABLE_BUTTON_FX, payload: lastYearDisabled }
}

export const disableButtonMaturity = (lastYearDisabled) => {
  return {
    type: storeConstants.DISABLE_BUTTON_MATURITY,
    payload: lastYearDisabled,
  }
}

export const loading = (loader) => {
  return { type: storeConstants.LOADER, payload: loader }
}

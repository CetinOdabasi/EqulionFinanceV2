import storeConstants from '../constants/actionTypes'

const current_year = new Date().getFullYear()
const current_month = new Date().getMonth()
const initialState = {
  firmBackground: {
    country: 'United States',
    industry: '',
    availability_of_annual_financial_statements:
      'Financial statetements are available and can be shared on this website',
    audit_of_financial_statements:
      'Audited by big four audit firms (Deloitte, PWC, KPMG, EY)',
    base_year: new Date(Date.UTC(current_year, current_month, 0)).getTime(),
    // base_month: new Date().getMonth() - 1,
    beginning_year: new Date(
      Date.UTC(current_year - 1, current_month, 0)
    ).getTime(),
    projection_frequency: 'Q',
    year_enter_the_forecast_horizon: new Date(
      Date.UTC(current_year + 1, current_month, 0)
    ).getTime(),
    currency_sym: '$',
    decimal: 'None',
  },
  financial_statements: [],
  fx_position: [],
  maturity_short_term: [],
  business_plan: [],
  analysisResult: {
    enable_custom_scenario: false,
  },
  initial_custom_scenario: [],
}

const analysisDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case storeConstants.GET_ANALYSIS_DATA_ALL:
      return {
        ...state,
        financial_statements: action.payload.financial_statements,
        fx_position: action.payload.fx_position,
        maturity_short_term: action.payload.maturity_short_term,
        business_plan: action.payload.business_plan,
        initial_custom_scenario: action.payload.custom_scenario,
        analysisResult: {
          enable_custom_scenario: false,
        },
      }
    case storeConstants.GET_ANALYSIS_REAL_DATA:
      return {
        ...state,
        analysisResult: { ...state.analysisResult, ...action.payload },
      }
    case storeConstants.ENABLE_CUSTOM_SCENARIO:
      return {
        ...state,
        analysisResult: {
          ...state.analysisResult,
          enable_custom_scenario: true,
        },
      }
    case storeConstants.DISABLE_CUSTOM_SCENARIO:
      return {
        ...state,
        analysisResult: {
          ...state.analysisResult,
          enable_custom_scenario: false,
        },
      }
    case storeConstants.DISABLE_BUTTON:
      return {
        ...state,
        financial_statements: [
          ...state.financial_statements.map((data, i) =>
            i === 0
              ? {
                  ...data,
                  ...(data[0] = { disabled: action.payload }),
                }
              : { ...data }
          ),
        ],
      }
    case storeConstants.DISABLE_BUTTON_FX:
      return {
        ...state,
        fx_position: [
          ...state.fx_position.map((data, i) =>
            i === 0
              ? {
                  ...data,
                  ...(data[0] = { disabled: action.payload }),
                }
              : { ...data }
          ),
        ],
      }
    case storeConstants.DISABLE_BUTTON_MATURITY:
      return {
        ...state,
        maturity_short_term: [
          ...state.maturity_short_term.map((data, i) =>
            i === 0
              ? {
                  ...data,
                  ...(data[0] = { disabled: action.payload }),
                }
              : { ...data }
          ),
        ],
      }
    case storeConstants.FIRM_BACKGROUND_SELECT:
      return {
        ...state,
        firmBackground: { ...state.firmBackground, ...action.payload },
      }
    case storeConstants.GET_LAST_CUSTOM_SCENARIO:
      return {
        ...state,
        analysisResult: { ...state.analysisResult, scenarios: action.payload },
      }
    default:
      return state
  }
}

export default analysisDataReducer

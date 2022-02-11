import axios from 'axios'

const DEFAULT_ANALYSİS_TABLES_BY_YEAR_AND_INDUSTRY = `${process.env.REACT_APP_REST_URL}/myfirm/default-analysis-tables-by-year-and-industry/`
const ANALYSİS_TABLES_BY_YEAR_AND_INDUSTRY = `${process.env.REACT_APP_REST_URL}/myfirm/analysis-tables-by-year-and-industry/`
const ANALYSIS = `${process.env.REACT_APP_REST_URL}/analysis/`
const FIRM_BACKGROUND = `${process.env.REACT_APP_REST_URL}/myfirm/firm-background/`
const REAL_ANALYSIS_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/real-financial-statements/`
const REAL_FX_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/real-fx-position/`
const REAL_MATURITY_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/real-maturity/`
const REAL_BUSINESS_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/real-business-plan/`
const FINANCIAL_ANALYSIS_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/financial-financial-statements/`
const FINANCIAL_FX_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/financial-fx-position/`
const FINANCIAL_MATURITY_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/financial-maturity/`
const FINANCIAL_BUSINESS_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/financial-analysis-business-plan/`
const CUSTOM_SCENARIO_CREATE = `${process.env.REACT_APP_REST_URL}/myfirm/analysis-custom-scenario/`
const GET_LAST_CUSTOM_SCENARIO = `${process.env.REACT_APP_REST_URL}/myfirm/last-custom-scenario-fetch/`

const analysisTablesByYearAndIndustry = (
  year,
  beginning_year,
  year_enter_the_forecast_horizon,
  projection_frequency,
  industry,
  token
) => {
  const header = token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      }
  return axios.post(
    token
      ? ANALYSİS_TABLES_BY_YEAR_AND_INDUSTRY
      : DEFAULT_ANALYSİS_TABLES_BY_YEAR_AND_INDUSTRY,
    {
      year,
      beginning_year,
      year_enter_the_forecast_horizon,
      projection_frequency,
      industry,
    },
    {
      headers: header,
    }
  )
}

const analysis = (values) => {
  console.log(values, 'values')
  return axios.post(ANALYSIS, values, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
// Create Data
const firmBackgroundCreate = (token, values) => {
  return axios.post(FIRM_BACKGROUND, values, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const realAnalysisCreate = (token, year_for_data) => {
  return axios.post(REAL_ANALYSIS_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const realFxCreate = (token, year_for_data) => {
  return axios.post(REAL_FX_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const realMaturityCreate = (token, year_for_data) => {
  return axios.post(REAL_MATURITY_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const realBusinessCreate = (token, year_for_data) => {
  return axios.post(REAL_BUSINESS_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const financialAnalysisCreate = (token, year_for_data) => {
  return axios.post(FINANCIAL_ANALYSIS_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const financialFxCreate = (token, year_for_data) => {
  return axios.post(FINANCIAL_FX_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const financialMaturityCreate = (token, year_for_data) => {
  return axios.post(FINANCIAL_MATURITY_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const financialBusinessCreate = (token, year_for_data) => {
  return axios.post(FINANCIAL_BUSINESS_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const customScenarioCreate = (token, year_for_data) => {
  return axios.post(CUSTOM_SCENARIO_CREATE, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

// Get Data
const getFirmBackground = (token) => {
  return axios.get(FIRM_BACKGROUND, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

const getLastCustomScenario = (token, year_for_data) => {
  return axios.post(GET_LAST_CUSTOM_SCENARIO, year_for_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
}

export {
  analysisTablesByYearAndIndustry,
  analysis,
  firmBackgroundCreate,
  realAnalysisCreate,
  realFxCreate,
  realMaturityCreate,
  realBusinessCreate,
  financialAnalysisCreate,
  financialFxCreate,
  financialMaturityCreate,
  financialBusinessCreate,
  customScenarioCreate,
  getFirmBackground,
  getLastCustomScenario,
}

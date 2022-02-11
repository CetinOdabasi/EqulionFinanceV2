import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  customScenarioCreate,
  firmBackgroundCreate,
  realAnalysisCreate,
  realBusinessCreate,
  realFxCreate,
  realMaturityCreate,
  financialAnalysisCreate,
  financialBusinessCreate,
  financialFxCreate,
  financialMaturityCreate,
} from '../redux/ApiCalls'

const AnalysisButtons = ({ activeTab, setActiveTab }) => {
  const {
    financial_statements,
    fx_position,
    maturity_short_term,
    business_plan,
    firmBackground,
    analysisResult,
  } = useSelector((state) => state.analysisDataReducer)
  const custom = analysisResult?.scenarios

  const token = useSelector((state) => state.auth.token)
  const history = useHistory()
  return (
    <div className="container">
      <div className="d-flex justify-content-evenly my-4">
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab(activeTab - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={
            token
              ? () => {
                  if (firmBackground.industry === 'Finance & Insurance') {
                    financialAnalysisCreate(token, financial_statements)
                    financialFxCreate(token, fx_position)
                    financialMaturityCreate(token, maturity_short_term)
                    financialBusinessCreate(token, business_plan)
                  } else {
                    realAnalysisCreate(token, financial_statements)
                    realFxCreate(token, fx_position)
                    realMaturityCreate(token, maturity_short_term)
                    realBusinessCreate(token, business_plan)
                  }
                  firmBackgroundCreate(token, firmBackground)
                  customScenarioCreate(token, custom)
                }
              : () => history.push('/register?saveAnalysis=true')
          }
        >
          Save Analysis
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab(activeTab + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AnalysisButtons

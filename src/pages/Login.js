import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../redux/actions/auth'
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

const Login = (props) => {
  const { register, handleSubmit } = useForm()
  const token = useSelector((state) => state.auth.token)
  const {
    firmBackground,
    financial_statements,
    fx_position,
    maturity_short_term,
    business_plan,
    analysisResult,
  } = useSelector((state) => state.analysisDataReducer)
  const custom = analysisResult?.scenarios

  const dispatch = useDispatch()

  if (token) {
    if (props.location.search.indexOf('saveAnalysis=true') > -1) {
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
      return <Redirect to="/myfirm" />
    } else {
      return <Redirect to="/myfirm" />
    }
  }

  const onSubmit = (data) => {
    dispatch(login(data))
  }

  if (token) {
    return <Redirect to="/" />
  }
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="text" {...register('email')} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" {...register('password')} />
          </div>
          <div className="form-group">
            <div
              className="col-md-12 text-center"
              type="submit"
              style={{ paddingTop: '30px' }}
            >
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
          <br />
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

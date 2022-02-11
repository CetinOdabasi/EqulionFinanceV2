import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { registration } from '../redux/actions/auth'
import {
  customScenarioCreate,
  financialAnalysisCreate,
  financialBusinessCreate,
  financialFxCreate,
  financialMaturityCreate,
  firmBackgroundCreate,
  realAnalysisCreate,
  realBusinessCreate,
  realFxCreate,
  realMaturityCreate,
} from '../redux/ApiCalls'

function Register(props) {
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

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    company_name: Yup.string().required('Company Name is required'),
    company_web_site: Yup.string().required('Company Web Site is required'),
    city: Yup.string().required('City is required'),
    your_role_at_the_company: Yup.string().required(
      'Your Role At The Company is required'
    ),
    business_description: Yup.string().required(
      'Business Description is required'
    ),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    password2: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  })

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
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
    dispatch(registration(data))
  }

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <div className="register-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="first_name"
                type="text"
                {...register('first_name')}
                className={`form-control ${
                  errors.first_name ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.first_name?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                name="last_name"
                type="text"
                {...register('last_name')}
                className={`form-control ${
                  errors.last_name ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.last_name?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="text"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                name="company_name"
                type="text"
                {...register('company_name')}
                className={`form-control ${
                  errors.company_name ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.company_name?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Company Web Site</label>
              <input
                name="company_web_site"
                type="text"
                {...register('company_web_site')}
                className={`form-control ${
                  errors.company_web_site ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.company_web_site?.message}
              </div>
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                name="city"
                type="text"
                {...register('city')}
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
            </div>

            <div className="form-group">
              <label>Your Role At The Company</label>
              <input
                name="your_role_at_the_company"
                type="text"
                {...register('your_role_at_the_company')}
                className={`form-control ${
                  errors.your_role_at_the_company ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.your_role_at_the_company?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Business Description</label>
              <input
                name="business_description"
                type="text"
                {...register('business_description')}
                className={`form-control ${
                  errors.business_description ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.business_description?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="password2"
                type="password"
                {...register('password2')}
                className={`form-control ${
                  errors.password2 ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.password2?.message}
              </div>
            </div>
            <div className="form-group">
              <div
                className="col-md-12 text-center"
                type="submit"
                style={{ paddingTop: '30px' }}
              >
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
            <br />
            <p>
              Already have an account?{' '}
              <Link
                to={
                  props.location.search.indexOf('saveAnalysis=true') > -1
                    ? '/login?saveAnalysis=true'
                    : '/login'
                }
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

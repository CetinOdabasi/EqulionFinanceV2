import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  country,
  industry,
  availabilityOfAnnualFinancialStatements,
  auditOfFinancialStatements,
  decimal,
  currencySym,
  frequency,
} from '../services'
import { firmBackgroundSelect } from '../redux/actions/analysisDataActions'
import { fetchAllAnalysis } from '../redux/actions/getAnalysisDataAll'
import {
  analysisTablesByYearAndIndustry,
  getFirmBackground,
} from '../redux/ApiCalls'

const Firmbackground = ({ changePage }) => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { firmBackground } = useSelector((state) => state.analysisDataReducer)

  const [beginningYears, setBeginningYears] = useState([])
  const [baseYears, setBaseYears] = useState([])
  const [forecastYears, setForecastYears] = useState([])

  useEffect(() => {
    if (token) {
      getFirmBackground(token)
        .then(({ data }) => {
          data.base_year = new Date(data.base_year).getTime()
          data.beginning_year = new Date(data.beginning_year).getTime()
          dispatch(firmBackgroundSelect(data))
        })
        .catch((err) => err)
    }
  }, [])

  const onChange = (e) => {
    console.log(e, 456)
    const newFirmbackground = Object.assign({}, firmBackground)
    newFirmbackground[e.target.name] =
      e.target.name === 'base_year' ||
      e.target.name === 'beginning_year' ||
      e.target.name === 'year_enter_the_forecast_horizon'
        ? Number(e.target.value)
        : e.target.value

    dispatch(firmBackgroundSelect(newFirmbackground))
    genarateYears()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    analysisTablesByYearAndIndustry(
      firmBackground.base_year,
      firmBackground.beginning_year,
      firmBackground.year_enter_the_forecast_horizon,
      firmBackground.projection_frequency,
      firmBackground.industry,
      token
    )
      .then(({ data }) => {
        Object.values(data).map((item) =>
          item.sort(
            (a, b) => new Date(a.year).getTime() - new Date(b.year).getTime()
          )
        )
        dispatch(fetchAllAnalysis(data))
        changePage()
      })
      .catch((err) => err)
  }

  const genarateYears = () => {
    const years = Array.from(new Array(880), (val, index) => {
      const current_year = new Date(firmBackground.base_year).getFullYear() + 10
      const current_month = new Date().getMonth()
      const month = index % 12
      const year = current_year - Math.floor((index + 10 - current_month) / 12)
      const date = new Date(Date.UTC(year, month - 1, 0)).getTime()

      return {
        label_year: new Date(date).toLocaleString('en-US', {
          year: 'numeric',
        }),
        label_month: new Date(date).toLocaleString('en-US', {
          month: 'long',
        }),
        value: date,
      }
    })

    years.sort((a, b) => b.value - a.value)

    const forecestYears = []
    const baseYearsArray = []
    years.map((year) => {
      if (
        new Date(year.value).getFullYear() > new Date().getFullYear() ||
        (new Date(year.value).getMonth() > new Date().getMonth() &&
          new Date(year.value).getFullYear() === new Date().getFullYear())
      ) {
        forecestYears.push(year)
      } else {
        baseYearsArray.push(year)
      }
    })
    setForecastYears(forecestYears)
    setBaseYears(baseYearsArray)
  }

  useEffect(genarateYears, [])

  const beginning_years = () => {
    const beginningArrays = Array.from(new Array(64), (val, index) => {
      if (!firmBackground?.base_year) {
        return
      }
      const current_year = new Date(
        Number(firmBackground.base_year)
      ).getFullYear()
      const year = current_year - index - 1
      const date = new Date(Date.UTC(year, 12, 0, 0)).getTime()

      return {
        label_year: new Date(date).toLocaleString('en-US', {
          year: 'numeric',
        }),
        label_month: new Date(date).toLocaleString('en-US', {
          month: 'long',
        }),
        value: date,
      }
    })
    const newFirmbackground = Object.assign({}, firmBackground)
    newFirmbackground.beginning_year = beginningArrays[0].value
    dispatch(firmBackgroundSelect(newFirmbackground))
    setBeginningYears(beginningArrays)
  }

  useEffect(beginning_years, [firmBackground.base_year])
  const previousMonth = new Date().getMonth()
  const y = Array.from(new Array(12), (val, index) => previousMonth + index)
  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="col-md-12 m-auto">
          <div className="card card-body mt-5">
            <form onSubmit={onSubmit}>
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Country of Operations:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.country}
                    name="country"
                    onChange={onChange}
                  >
                    {country.map((option, i) => (
                      <option
                        value={option.label}
                        selected={option.label === firmBackground.country}
                        key={i}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Industry of the Company:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.industry}
                    name="industry"
                    onChange={onChange}
                    required
                  >
                    <option selected value={''}>
                      Please Select...
                    </option>
                    {industry.map((option, i) => (
                      <option value={option.value} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Availability of Financial Statements:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={
                      firmBackground.availability_of_annual_financial_statements
                    }
                    name="availability_of_annual_financial_statements"
                    onChange={onChange}
                  >
                    {availabilityOfAnnualFinancialStatements.map(
                      (option, i) => (
                        <option value={option.value} key={i}>
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Audition Status of Financial Statetements:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.audit_of_financial_statements}
                    name="audit_of_financial_statements"
                    onChange={onChange}
                  >
                    {auditOfFinancialStatements.map((option, i) => (
                      <option value={option.value} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Enter the Date for the Latest Financial Report:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    // value={firmBackground.base_year}
                    name="base_year"
                    onChange={onChange}
                  >
                    {baseYears.map((year, index) => (
                      <option
                        key={`year${index}`}
                        value={year.value}
                        selected={firmBackground.base_year === year.value}
                      >
                        {year.label_year + ' ' + year.label_month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Beginning Year of the Historical Data:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    // value={firmBackground.beginning_year}
                    name="beginning_year"
                    onChange={onChange}
                  >
                    {beginningYears.map((year, index) => {
                      return (
                        <option
                          key={`year${index}`}
                          value={year.value}
                          selected={
                            new Date(
                              Number(firmBackground.beginning_year)
                            ).getFullYear() ===
                            new Date(year.value).getFullYear()
                          }
                        >
                          {year.label_year + ' ' + year.label_month}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <br />

              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Frequency of Forecast:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.projection_frequency}
                    name="projection_frequency"
                    onChange={onChange}
                  >
                    {frequency.map((option, i) => (
                      <option value={option.value} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Enter the Forecast Horizon:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.year_enter_the_forecast_horizon}
                    name="year_enter_the_forecast_horizon"
                    onChange={onChange}
                  >
                    {forecastYears.map((year, index) => (
                      <option key={`year${index}`} value={year.value}>
                        {year.label_year + ' ' + year.label_month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Select the Decimal Unit for Financial Data:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.currency_sym?.index}
                    name="currency_sym"
                    onChange={onChange}
                  >
                    {currencySym.map((option, i) => (
                      <option value={option.value} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="row justify-content-end">
                <div className="col-4">
                  <label for="inputPassword6" className="col-form-label">
                    Select the Decimal Unit for Financial Data:
                  </label>
                </div>
                <div className="col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={firmBackground.decimal}
                    name="decimal"
                    onChange={onChange}
                  >
                    {decimal.map((option, i) => (
                      <option value={option.value} key={i}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-primary mt-3" type="submit">
                Proceed To Analysis
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Firmbackground

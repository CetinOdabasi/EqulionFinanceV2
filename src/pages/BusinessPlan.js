import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as analysisDataActions from '../redux/actions/analysisDataActions'
import { analysis } from '../redux/ApiCalls'

const BusinessPlan = () => {
  const dispatch = useDispatch()
  const [lastKeyPress, setLastKeyPress] = useState('')

  const {
    firmBackground,
    financial_statements,
    fx_position,
    maturity_short_term,
    business_plan,
    analysisResult,
  } = useSelector((state) => state.analysisDataReducer)

  const handleInputChange = (value, key, index) => {
    const numberRegex = /[0-9]/g
    if (value.match(numberRegex)?.length === value.length) {
      const newBusinessData = [...business_plan]
      const findValue = newBusinessData[index].values.find(
        (item) => item.key === key
      )

      findValue.value = Number(value)
      dispatch(analysisDataActions.businessPlan(newBusinessData))
      setLastKeyPress(newBusinessData)
    }
  }

  useEffect(() => {
    if (lastKeyPress) {
      const timeoutId = setTimeout(() => calculateAnalysis(), 1500)
      return () => clearTimeout(timeoutId)
    }
  }, [lastKeyPress])

  const trueOrFalse = (() => {
    if (firmBackground.industry === 'Finance & Insurance') {
      return true
    }
    return false
  })()

  const calculateAnalysis = () => {
    const postData = {
      analysis_data: {
        financial: {},
        fx: {},
        maturity: {},
        business_plan: {},
        scenario: {},
      },
      firm_background: firmBackground,
      is_analysis_real: trueOrFalse,
      enable_custom_scenario: false,
    }

    financial_statements.map((item, index) => {
      if (index === 0) {
        item.values.map((value) => {
          postData.analysis_data.financial[value.key] = [value.value]
        })
      } else {
        item.values.map((value) => {
          postData.analysis_data.financial[value.key].push(value.value)
        })
      }
    })

    fx_position.map((item, index) => {
      if (index === 0) {
        item.values.map((value) => {
          postData.analysis_data.fx[value.key] = [value.value]
        })
      } else {
        item.values.map((value) => {
          postData.analysis_data.fx[value.key].push(value.value)
        })
      }
    })

    maturity_short_term.map((item, index) => {
      if (index === 0) {
        item.values.map((value) => {
          postData.analysis_data.maturity[value.key] = [value.value]
        })
      } else {
        item.values.map((value) => {
          postData.analysis_data.maturity[value.key].push(value.value)
        })
      }
    })

    business_plan.map((item, index) => {
      if (index === 0) {
        item.values.map((value) => {
          postData.analysis_data.business_plan[value.key] = [value.value]
        })
      } else {
        item.values.map((value) => {
          postData.analysis_data.business_plan[value.key].push(value.value)
        })
      }
    })

    analysisResult?.scenarios?.map((item, index) => {
      if (index === 0) {
        item.values.map((value) => {
          postData.analysis_data.scenario[value.key] = [value.value]
        })
      } else {
        item.values.map((value) => {
          postData.analysis_data.scenario[value.key].push(value.value)
        })
      }
    })

    analysis(postData)
      .then(({ data }) => {
        dispatch(analysisDataActions.fetchRealAnalysis(data))
      })
      .catch((err) => err)
  }

  const table = (
    <div className="tableBackground">
      <table className="table">
        <thead>
          <tr>
            <th></th>

            {business_plan.map((item, index) => (
              <th key={index} scope="col">
                {new Date(item.year).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {business_plan[0]?.values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.label}
              {business_plan.map((yearData, columnIndex) => (
                <>
                  <td key={columnIndex}>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleInputChange(e.target.value, row.key, columnIndex)
                      }
                      defaultValue="0"
                      value={yearData.values[rowIndex].value}
                    />
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="container">
      <br />
      <h1 className="FinancialStatementTitle">
        Business Plan
        <span className="paranthesis">
          (Currency:
          <span style={{ color: '#85BB65' }}>
            {' '}
            {firmBackground.currency_sym}
          </span>
          , Decimal Unit:
          <span style={{ color: '#85BB65' }}> {firmBackground.decimal})</span>
        </span>
      </h1>
      <br />
      {table}
    </div>
  )
}

export default BusinessPlan

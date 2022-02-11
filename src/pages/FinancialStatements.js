import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as analysisDataActions from '../redux/actions/analysisDataActions'
import { analysis } from '../redux/ApiCalls'

const FinancialStatements = () => {
  const dispatch = useDispatch()
  const [lastKeyPress, setLastKeyPress] = useState(null)

  const {
    financial_statements,
    fx_position,
    maturity_short_term,
    business_plan,
    initial_custom_scenario,
    analysisResult,
    firmBackground,
  } = useSelector((state) => state.analysisDataReducer)

  const handleInputChange = (value, key, index) => {
    const numberRegex = /[0-9]/g

    if (value.match(numberRegex)?.length === value.length) {
      const newFinancialStatements = [...financial_statements]

      const findValue = newFinancialStatements[index].values.find(
        (item) => item.key === key
      )

      findValue.value = Number(value)
      dispatch(analysisDataActions.financialStatements(newFinancialStatements))
      setLastKeyPress(newFinancialStatements)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => calculateAnalysis(), 1500)
    return () => clearTimeout(timeoutId)
  }, [financial_statements, lastKeyPress])

  const trueOrFalse = (() => {
    if (firmBackground.industry === 'Finance & Insurance') {
      return false
    }
    return true
  })()

  const calculateAnalysis = () => {
    const postData = {
      firm_background: firmBackground,
      analysis_data: {
        financial: {},
        fx: {},
        maturity: {},
        business_plan: {},
        scenario: {},
      },
      is_analysis_real: trueOrFalse,
      enable_custom_scenario: analysisResult.enable_custom_scenario,
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

    if (analysisResult?.scenarios) {
      analysisResult.scenarios.map((item, index) => {
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
    } else {
      initial_custom_scenario.map((item, index) => {
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
    }

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
            <th>Balance Sheet</th>

            {financial_statements.map((item, index) => (
              <th key={index} scope="col">
                {new Date(item.year).toLocaleString('en-US', {
                  year: 'numeric',
                }) +
                  '-' +
                  new Date(item.year).toLocaleString('en-US', {
                    month: 'short',
                  })}
              </th>
            ))}

            {analysisResult?.financial_statements?.map(
              (yearData, columnIndex) => {
                yearData.year.split('-')
                const date = new Date(
                  Number(yearData.year.split('-')[0]),
                  Number(yearData.year.split('-')[1]),
                  0
                )
                return (
                  <th scope="col" key={columnIndex}>
                    {date.toLocaleString('en-US', {
                      year: 'numeric',
                    }) +
                      '-' +
                      date.toLocaleString('en-US', {
                        month: 'short',
                      })}
                  </th>
                )
              }
            )}
          </tr>
        </thead>
        <tbody>
          {financial_statements[0]?.values.slice(0, 11).map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className={
                  row.label === 'Total Assets' ||
                  row.label === 'Total Liabilities And Equity'
                    ? 'fw-bold'
                    : ''
                }
              >
                {row.label}
              </td>
              {financial_statements.map((yearData, columnIndex) => (
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
              {analysisResult?.financial_statements?.map(
                (yearData, columnIndex) => (
                  <>
                    <td key={columnIndex}>
                      <input
                        type="text"
                        defaultValue={0}
                        value={yearData.values[rowIndex].value}
                        disabled
                      />
                    </td>
                  </>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr>
            <th>Income Statements</th>

            {financial_statements.map((item, index) => (
              <th key={index} scope="col">
                {new Date(item.year).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })}
              </th>
            ))}
            {analysisResult?.financial_statements?.map(
              (yearData, columnIndex) => {
                yearData.year.split('-')
                const date = new Date(
                  Number(yearData.year.split('-')[0]),
                  Number(yearData.year.split('-')[1]),
                  0
                )
                return (
                  <th scope="col" key={columnIndex}>
                    {date.toLocaleString('en-US', {
                      year: 'numeric',
                    }) +
                      '-' +
                      date.toLocaleString('en-US', {
                        month: 'short',
                      })}
                  </th>
                )
              }
            )}
            {/* <th scope="col">{financial_statements[2]?.year + 1}</th>
            <th scope="col">{financial_statements[2]?.year + 2}</th>
            <th scope="col">{financial_statements[2]?.year + 3}</th>
            <th scope="col">{financial_statements[2]?.year + 4}</th>
            <th scope="col">{financial_statements[2]?.year + 5}</th> */}
          </tr>
        </thead>
        <tbody>
          {financial_statements[0]?.values
            .slice(12, financial_statements[0].values.length)
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={row.label === 'Net Income' ? 'fw-bold' : ''}>
                  {row.label}
                </td>
                {financial_statements.map((yearData, columnIndex) => (
                  <td key={columnIndex}>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleInputChange(e.target.value, row.key, columnIndex)
                      }
                      defaultValue="0"
                      value={yearData.values[rowIndex + 12].value}
                    />
                  </td>
                ))}

                {analysisResult?.financial_statements?.map(
                  (yearData, columnIndex) => (
                    <>
                      <td key={columnIndex}>
                        <input
                          type="text"
                          defaultValue={0}
                          value={yearData?.values[rowIndex + 12].value}
                          disabled
                        />
                      </td>
                    </>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="container">
      <h1 className="FinancialStatementTitle">
        Financial Statements{' '}
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
      {table}
    </div>
  )
}

export default FinancialStatements

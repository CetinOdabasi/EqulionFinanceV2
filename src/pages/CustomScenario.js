import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as analysisDataActions from '../redux/actions/analysisDataActions'
import { getLastCustomScenario, analysis } from '../redux/ApiCalls'

const CustomScenario = () => {
  const dispatch = useDispatch()
  const [lastKeyPress, setLastKeyPress] = useState('')
  const { token } = useSelector((state) => state.auth)

  const [isLastCustomScenario, setIsLastCustomScenario] = useState(false)

  const {
    firmBackground,
    financial_statements,
    fx_position,
    maturity_short_term,
    business_plan,
    analysisResult,
  } = useSelector((state) => state.analysisDataReducer)

  const { scenarios } = analysisResult

  const trueOrFalse = (() => {
    if (firmBackground.industry === 'Finance & Insurance') {
      return false
    }
    return true
  })()

  const calculateAnalysis = (isCustomScenario) => {
    if (analysisResult.enable_custom_scenario !== isCustomScenario) {
      isCustomScenario
        ? dispatch(analysisDataActions.enableCustomScenario())
        : dispatch(analysisDataActions.disableCustomScenario())
    }
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
      enable_custom_scenario: isCustomScenario,
      projection_frequency: firmBackground.projection_frequency,
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
  const handleInputChange = (value, key, index) => {
    const numberRegex = /[0-9]/g
    if (value.match(numberRegex)?.length === value.length) {
      const newCustomScenarioData = [...scenarios]

      const findValue = newCustomScenarioData[index].values.find(
        (item) => item.key === key
      )

      findValue.value = Number(value)
      dispatch(analysisDataActions.customScenario(newCustomScenarioData))
      setLastKeyPress(newCustomScenarioData)
    }
  }

  useEffect(() => {
    if (lastKeyPress) {
      const timeoutId = setTimeout(() => calculateAnalysis(true), 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [lastKeyPress])

  const removeCustomScenario = () => {
    setIsLastCustomScenario(false)
    calculateAnalysis(false)
  }

  const getLastCustom = () => {
    getLastCustomScenario(token, firmBackground.base_year)
      .then(({ data }) => {
        data.sort((a, b) => a.year - b.year)
        dispatch(analysisDataActions.getLastCustomScenarioAction(data))
        setIsLastCustomScenario(true)
      })
      .catch((err) => err)
  }

  useEffect(() => {
    if (isLastCustomScenario) {
      dispatch(analysisDataActions.enableCustomScenario())
      calculateAnalysis(true)
    }
  }, [isLastCustomScenario])

  const table = (
    <div className="tableBackground">
      {token ? (
        <div className="w-100 py-2 text-end">
          <button onClick={getLastCustom} className="btn btn-primary mr-2">
            Get Last Custom Scenario
          </button>
          <button onClick={removeCustomScenario} className="btn btn-primary">
            Remove Custom Scenario
          </button>
        </div>
      ) : (
        <div className="w-100 py-2 text-end">
          <button onClick={removeCustomScenario} className="btn btn-primary">
            Remove Custom Scenario
          </button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Custom Scenario</th>
            {scenarios?.map(({ year }, index) => (
              <th key={index} scope="col">
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scenarios
            ? scenarios[0].values.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.label}
                  {scenarios.map((yearData, columnIndex) => (
                    <>
                      <td key={columnIndex}>
                        <input
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              row.key,
                              columnIndex
                            )
                          }
                          defaultValue="0"
                          step={'.01'}
                          value={yearData.values[rowIndex].value}
                        />
                      </td>
                    </>
                  ))}
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="container">
      <br />
      <h1 className="FinancialStatementTitle">Custom Scenario</h1>
      {table}
    </div>
  )
}

export default CustomScenario

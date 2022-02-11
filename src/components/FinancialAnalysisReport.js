import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Bar, Line } from 'react-chartjs-2'

const indicatorsBackgroundColor = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(255, 99, 132, 0.6)',
]

const FinancialAnalysisReport = () => {
  const [chartDatas, setChartDatas] = useState({})
  const [chartIndicatorsDatas, setChartIndicatorsDatas] = useState({})

  const { analysisResult, firmBackground } = useSelector(
    (state) => state.analysisDataReducer
  )

  const {
    custom_financial_statements,
    financial_statements,
    enable_custom_scenario,
  } = analysisResult

  const myfirm = useSelector((state) => state.myfirm.myfirm)

  const labels = []

  analysisResult.financial_statements.map((datas) => {
    labels.push(datas.year)
  })

  const financialAnalysisFieldTable = (keyArrays) => {
    let newChartData = {}

    keyArrays.map((key) => {
      const dataSet = []

      const baselineDataSet = {
        backgroundColor: indicatorsBackgroundColor,
        fill: false,
        label: 'Baseline Scenario',
        title: 'test',
        chartType: 'line',
        data: [],
      }
      const customDataSet = {
        backgroundColor: indicatorsBackgroundColor,
        fill: false,
        label: 'Custom Scenario',
        title: 'test',
        chartType: 'line',
        data: [],
      }
      analysisResult.financial_statements.map((datas) => {
        const totalAsetValue = datas.values.find((item) => item.key === key)
        baselineDataSet.data.push(totalAsetValue.value)
      })
      dataSet.push(baselineDataSet)

      if (enable_custom_scenario) {
        analysisResult.custom_financial_statements.map((datas) => {
          const totalAsetValue = datas.values.find((item) => item.key === key)
          customDataSet.data.push(totalAsetValue.value)
        })
        dataSet.push(customDataSet)
      }

      newChartData[key] = { labels, datasets: dataSet }
    })
    setChartDatas(newChartData)
  }

  const indicatorsTables = (keyArrays) => {
    let newChartData = {}

    keyArrays.map((key) => {
      const dataSet = []

      const baselineDataSet = {
        backgroundColor: indicatorsBackgroundColor,
        fill: false,
        label: 'Baseline Scenario',
        title: 'test',
        chartType: 'line',
        data: [],
      }
      const customDataSet = {
        backgroundColor: indicatorsBackgroundColor,
        fill: false,
        label: 'Custom Scenario',
        title: 'test',
        chartType: 'line',
        data: [],
      }
      analysisResult.indicators.map((datas) => {
        const indicatorsData = datas.values.find((item) => item.label === key)
        baselineDataSet.data.push(indicatorsData.value)
      })
      dataSet.push(baselineDataSet)

      if (enable_custom_scenario) {
        analysisResult.custom_indicators.map((datas) => {
          const indicatorsData = datas.values.find((item) => item.label === key)
          customDataSet.data.push(indicatorsData.value)
        })
        dataSet.push(customDataSet)
      }

      newChartData[key] = { labels, datasets: dataSet }
    })
    setChartIndicatorsDatas(newChartData)
  }

  useEffect(() => {
    financialAnalysisFieldTable(['total_assets', 'net_income'])
  }, [])

  useEffect(() => {
    indicatorsTables([
      'Capital Adequacy Ratio(CAR)',
      'Liquidity Ratio',
      'Growth Rate Of Loans',
      'NPL Ratio',
      'Specific Reserve Ratio',
      'Loans to Deposits',
      'Leverage',
      'Net Interest Margin',
      'Return on Assets(ROA)',
      'Return on Equity(ROE)',
    ])
  }, [])

  const table = (
    <div className="tableBackground">
      <table className="table">
        <thead>
          <tr>
            <th>Balance Sheet</th>
            <th scope="col">{financial_statements[2]?.year + 1}</th>
            <th scope="col">{financial_statements[2]?.year + 2}</th>
            <th scope="col">{financial_statements[2]?.year + 3}</th>
            <th scope="col">{financial_statements[2]?.year + 4}</th>
            <th scope="col">{financial_statements[2]?.year + 5}</th>
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
            <th scope="col">{financial_statements[2]?.year + 1}</th>
            <th scope="col">{financial_statements[2]?.year + 2}</th>
            <th scope="col">{financial_statements[2]?.year + 3}</th>
            <th scope="col">{financial_statements[2]?.year + 4}</th>
            <th scope="col">{financial_statements[2]?.year + 5}</th>
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
  const customTable = (
    <div className="tableBackground">
      <table className="table">
        <thead>
          <tr>
            <th>Balance Sheet</th>
            <th scope="col">{custom_financial_statements[0]?.year + 0}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 1}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 2}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 3}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 4}</th>
          </tr>
        </thead>
        <tbody>
          {custom_financial_statements[0]?.values
            .slice(0, 11)
            .map((row, rowIndex) => (
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
                {analysisResult?.custom_financial_statements?.map(
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
            <th scope="col">{custom_financial_statements[0]?.year + 0}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 1}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 2}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 3}</th>
            <th scope="col">{custom_financial_statements[0]?.year + 4}</th>
          </tr>
        </thead>
        <tbody>
          {custom_financial_statements[0]?.values
            .slice(12, custom_financial_statements[0].values.length)
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={row.label === 'Net Income' ? 'fw-bold' : ''}>
                  {row.label}
                </td>
                {analysisResult?.custom_financial_statements?.map(
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
    <div>
      {(() => (
        <div
          class="container"
          style={{ paddingBottom: '10px', paddingTop: '10px' }}
        >
          <div class="row">
            <div class="col-6">
              <h5>
                Business Name:
                <span style={{ color: '#FD91AA' }}>{myfirm.businessName}</span>
              </h5>
              <h5>
                Industry:
                <span style={{ color: '#FD91AA' }}>
                  {firmBackground.industry}
                </span>
              </h5>
              <h5>
                Country of Operations:
                <span style={{ color: '#FD91AA' }}>
                  {firmBackground.country}
                </span>
              </h5>
            </div>
            <div class="col-6"></div>
          </div>
        </div>
      ))()}
      {analysisResult ? (
        <div className="container" style={{ backgroundColor: 'white' }}>
          <div className="row justify-content-center">
            <div className="col-6">
              <h3>
                Total Assets
                <span className="paranthesis">
                  (Currency: {firmBackground.currency_sym}, Decimal Unit:{' '}
                  {firmBackground.decimal})
                </span>
              </h3>
              <Line data={chartDatas.total_assets} />
            </div>
            <div className="col-6">
              <h3>
                Net Income
                <span className="paranthesis">
                  (Currency: {firmBackground.currency_sym}, Decimal Unit:{' '}
                  {firmBackground.decimal})
                </span>{' '}
              </h3>
              <Line data={chartDatas.net_income} />
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-6">
              <h3>Capital Adequacy Ratio(CAR) (%)</h3>
              <Bar data={chartIndicatorsDatas['Capital Adequacy Ratio(CAR)']} />
            </div>
            <div className="col-6">
              <h3>Liquidity Ratio (%)</h3>
              <Bar data={chartIndicatorsDatas['Liquidity Ratio']} />
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-6">
              <h3>Growth Rate Of Loans (%)</h3>
              <Bar data={chartIndicatorsDatas['Growth Rate Of Loans']} />
            </div>
            <div className="col-6">
              <h3>NPL Ratio(%)</h3>
              <Bar data={chartIndicatorsDatas['NPL Ratio']} />
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-6">
              <h3>Specific Reserve Ratio (%)</h3>
              <Bar data={chartIndicatorsDatas['Specific Reserve Ratio']} />
            </div>
            <div className="col-6">
              <h3>Loans to Deposits (%)</h3>
              <Bar data={chartIndicatorsDatas['Loans to Deposits']} />
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-6">
              <h3>Leverage (%)</h3>
              <Bar data={chartIndicatorsDatas['Leverage']} />
            </div>
            <div className="col-6">
              <h3>Net Interest Margin (%)</h3>
              <Bar data={chartIndicatorsDatas['Net Interest Margin']} />
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-6">
              <h3>Return on Assets(ROA)</h3>
              <Bar data={chartIndicatorsDatas['Return on Assets(ROA)']} />
            </div>
            <div className="col-6">
              <h3>Return on Equity(ROE) (%)</h3>
              <Bar data={chartIndicatorsDatas['Return on Equity(ROE)']} />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <br />
      <br />
      <br />
      {analysisResult ? (
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
              <span style={{ color: '#85BB65' }}>
                {' '}
                {firmBackground.decimal})
              </span>
            </span>
          </h1>
          {table}
          <br />
          <h1 className="FinancialStatementTitle">
            Custom Scenario Predictions{' '}
            <span className="paranthesis">
              (Currency:
              <span style={{ color: '#85BB65' }}>
                {' '}
                {firmBackground.currency_sym}
              </span>
              , Decimal Unit:
              <span style={{ color: '#85BB65' }}>
                {' '}
                {firmBackground.decimal})
              </span>
            </span>
          </h1>
          {customTable}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default FinancialAnalysisReport

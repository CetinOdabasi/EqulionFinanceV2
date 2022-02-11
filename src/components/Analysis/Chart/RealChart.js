import { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import {
  newFinancialFormFields,
  newFinancialFormNames,
  NumberPositive,
} from '../CommonService/formcontrolarrayservices'

const inputStyle = {
  margin: '4px',
  color: 'black ',
  width: '7em',
}

function RealChart() {
  const analysisMatrixDisabled = Array.from(
    { length: newFinancialFormFields.length },
    () => Array.from({ length: 5 }, () => 0)
  )
  const customAnalysisMatrixDisabled = Array.from(
    { length: newFinancialFormFields.length },
    () => Array.from({ length: 5 }, () => 0)
  )

  const [dataChartTotalAssets, setDataChartTotalAssets] = useState({})
  const [dataChartNetIncome, setDataChartNetIncome] = useState({})
  const [dataChartAdequacy, setDataChartAdequacy] = useState({})
  const [dataChartLiquidity, setDataChartLiquidity] = useState({})
  const [dataChartGrowthRateOfLoans, setDataChartGrowthRateOfLoans] = useState(
    {}
  )
  const [dataChartNpl, setDataChartNpl] = useState({})
  const [dataChartSpecificReserve, setDataChartSpecificReserve] = useState({})
  const [dataChartLoansToDeposits, setDataChartLoansToDeposits] = useState({})
  const [dataChartLeverage, setDataChartLeverage] = useState({})
  const [dataChartNetInterestMargin, setDataChartNetInterestMargin] = useState(
    {}
  )
  const [dataChartReturnOnAssets, setDataChartReturnOnAssets] = useState({})

  const valuesFetch = useSelector((state) => state.analysisDataReducers.values)

  const firmBackground = useSelector(
    (state) => state.firm_background.firm_background
  )
  const myfirm = useSelector((state) => state.myfirm.myfirm)

  const newFinancialFormNamesTable = newFinancialFormNames.map(
    (doublearray) => (
      <label className="col-table-label" style={{ marginTop: '7px' }}>
        {doublearray}
      </label>
    )
  )

  const arr = []
  valuesFetch.map((fetchData) =>
    fetchData.financial_statements.data.map((financialData, index) => (
      <tr key={index}>
        {financialData.map((data) => (
          <div key={data.index}>{arr.push(data)}</div>
        ))}
      </tr>
    ))
  )

  const newArr = []
  while (arr.length) newArr.push(arr.splice(0, 6))

  newArr.forEach((array) => array.splice(0, 1)) // Tüm dizilerin ilk elamanı hariç tuttuk

  const analysisMatrixDisabledTable = analysisMatrixDisabled.map(
    (roww, rowIndex) => (
      <tr key={rowIndex}>
        {roww.map((column, columnIndex) => (
          <td key={columnIndex}>
            <input
              type="number"
              disabled
              value={newArr?.[rowIndex]?.[columnIndex]}
              style={inputStyle}
            />
          </td>
        ))}
      </tr>
    )
  )

  const customArr = []
  if (valuesFetch.length > 1) {
    valuesFetch[1].financial_statements.data.map((financialData, index) => (
      <tr key={index}>
        {financialData.map((data) => (
          <div key={data.index}>{customArr.push(data)}</div>
        ))}
      </tr>
    ))
  }

  const customNewArr = []
  while (customArr.length) customNewArr.push(customArr.splice(0, 6))

  customNewArr.forEach((array) => array.splice(0, 1))

  const customAnalysisMatrixDisabledTable = customAnalysisMatrixDisabled.map(
    (roww, rowIndex) => (
      <tr key={rowIndex}>
        {roww.map((column, columnIndex) => (
          <td key={columnIndex}>
            <input
              type="number"
              disabled
              defaultValue="0"
              value={newArr?.[rowIndex]?.[columnIndex]}
              style={inputStyle}
            />
          </td>
        ))}
      </tr>
    )
  )

  const latesYear = firmBackground.base_year

  const mapNumberPositive = NumberPositive.map((numberpositive, index) => (
    <th
      key={index}
      style={{ paddingRight: '56px' }}
      className="realMapNumberPositive"
    >
      {parseInt(latesYear, 10) + numberpositive}
    </th>
  ))

  const balanceSheetTable = newFinancialFormNames
    .slice(0, 11)
    .map((doublearray, index) => (
      <label
        key={index}
        className="col-table-label"
        style={{ marginTop: '6px' }}
      >
        {doublearray}
      </label>
    ))

  const inComeTable = newFinancialFormNames
    .slice(12, newFinancialFormNames.length)
    .map((doublearray) => (
      <label className="col-form-label" style={{ marginTop: '2px' }}>
        {doublearray}
      </label>
    ))
  const tableMainHeader = (text) => (
    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{text}</span>
  )

  const getBalanceTable = (labelData, text, isBlack) => (
    <table className="table">
      <tbody>
        <tr>
          <div style={{ width: '310px' }}>
            <td>{tableMainHeader(text, isBlack)}</td>
            {labelData}
          </div>

          <td>
            {mapNumberPositive}
            {analysisMatrixDisabledTable.slice(0, 11)}
          </td>
        </tr>
      </tbody>
    </table>
  )

  const getIncomeTable = (labelData, text, isBlack) => (
    <table className="table">
      <tbody>
        <tr>
          <div id="table-income-label" style={{ width: '310px' }}>
            <td>
              <td>{tableMainHeader(text, isBlack)}</td>
              {labelData}
            </td>
          </div>
          <td>
            {mapNumberPositive}
            {analysisMatrixDisabledTable.slice(
              12,
              newFinancialFormNames.length
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )

  useEffect(() => {
    const constructedChartData = []
    for (let i = 0; i < valuesFetch.length; i++) {
      for (
        let j = 0;
        j < valuesFetch[i].financial_statements.index.length;
        j++
      ) {
        if (valuesFetch[i].financial_statements.index[j] === 'Total Assets') {
          if (i === 0) {
            constructedChartData.push([
              {
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                ],
              },
            ])
            constructedChartData[0].chartType = 'line'
            constructedChartData[0][0].data =
              valuesFetch[i].financial_statements.data[j]

            constructedChartData[0][0].label = 'Baseline Scenario'

            constructedChartData[0][0].title = 'Total Assets'
            constructedChartData[0][0].fill = false
          }
          if (i === 1) {
            constructedChartData[0].push({
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
              ],
            })
            constructedChartData[0][1].data =
              valuesFetch[i].financial_statements.data[j]
            constructedChartData[0][1].label = 'Custom Scenario'
            constructedChartData[0][1].title = 'Total Assets'
            constructedChartData[0][1].fill = false
          }
        }
        if (valuesFetch[i].financial_statements.index[j] === 'Net Income') {
          if (i === 0) {
            constructedChartData.push([
              {
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                ],
              },
            ])
            constructedChartData[1].chartType = 'line'
            constructedChartData[1][0].data =
              valuesFetch[i].financial_statements.data[j]

            constructedChartData[1][0].label = 'Baseline Scenario'

            constructedChartData[1][0].title = 'Net Income'
            constructedChartData[1][0].fill = false
          }
          if (i === 1) {
            constructedChartData[1].push({})
            constructedChartData[1][1].data =
              valuesFetch[i].financial_statements.data[j]
            constructedChartData[1][1].label = 'Custom Scenario'
            constructedChartData[1][1].title = 'Net Income'
            constructedChartData[1][1].fill = false
          }
        }
      }

      for (let j = 0; j < valuesFetch[i].indicators.index.length; j++) {
        if (i === 0) {
          constructedChartData.push([
            {
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
              ],
            },
          ])
          constructedChartData[j + 2].chartType = 'bar'
          constructedChartData[j + 2][0].data =
            valuesFetch[i].indicators.data[j]
          constructedChartData[j + 2][0].label = 'Baseline Scenario'
          constructedChartData[j + 2][0].title =
            valuesFetch[i].indicators.index[j]
        }
        if (i === 1) {
          constructedChartData[j + 2].push({})
          constructedChartData[j + 2][1].data =
            valuesFetch[i].indicators.data[j]
          constructedChartData[j + 2][1].label = 'Custom Scenario'
          constructedChartData[j + 2][0].title =
            valuesFetch[i].indicators.index[j]
        }
      }
      const cLabels = []
      for (let k = 0; k < valuesFetch[i].indicators.columns.length; k++) {
        cLabels.push(valuesFetch[i].indicators.columns[k][1])
      }

      const chartDataTotalAssets = constructedChartData[0].map((data) => data)
      const chartDataNetIncome = constructedChartData[1].map((data) => data)
      const chartDataCapitalAdequacyRatio = constructedChartData[2].map(
        (data) => data
      )
      const chartDataLiquidityRatio = constructedChartData[3].map(
        (data) => data
      )
      const chartDataGrowthRateOfLoans = constructedChartData[4].map(
        (data) => data
      )
      const chartDataNPLRatio = constructedChartData[5].map((data) => data)
      const chartDataSpecificReserveRatio = constructedChartData[6].map(
        (data) => data
      )
      const chartDataLoansToDeposits = constructedChartData[7].map(
        (data) => data
      )
      const chartDataLeverage = constructedChartData[8].map((data) => data)
      const chartDataNetInterestMargin = constructedChartData[9].map(
        (data) => data
      )
      const chartDataReturnOnAssets = constructedChartData[10].map(
        (data) => data
      )

      setDataChartTotalAssets({
        labels: cLabels,
        datasets: chartDataTotalAssets,
      })
      setDataChartNetIncome({
        labels: cLabels,
        datasets: chartDataNetIncome,
      })
      setDataChartAdequacy({
        labels: cLabels,
        datasets: chartDataCapitalAdequacyRatio,
      })
      setDataChartLiquidity({
        labels: cLabels,
        datasets: chartDataLiquidityRatio,
      })
      setDataChartGrowthRateOfLoans({
        labels: cLabels,
        datasets: chartDataGrowthRateOfLoans,
      })
      setDataChartNpl({
        labels: cLabels,
        datasets: chartDataNPLRatio,
      })
      setDataChartSpecificReserve({
        labels: cLabels,
        datasets: chartDataSpecificReserveRatio,
      })
      setDataChartLoansToDeposits({
        labels: cLabels,
        datasets: chartDataLoansToDeposits,
      })
      setDataChartLeverage({
        labels: cLabels,
        datasets: chartDataLeverage,
      })
      setDataChartNetInterestMargin({
        labels: cLabels,
        datasets: chartDataNetInterestMargin,
      })
      setDataChartReturnOnAssets({
        labels: cLabels,
        datasets: chartDataReturnOnAssets,
      })
    }
  }, [valuesFetch])

  return (
    <div>
      {(() => {
        if (valuesFetch.length > 0) {
          return (
            <div
              class="container"
              style={{ paddingBottom: '10px', paddingTop: '10px' }}
            >
              <div class="row">
                <div class="col-6">
                  <h5>
                    Business Name:
                    <span style={{ color: '#FD91AA' }}>
                      {myfirm.businessName}
                    </span>
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
          )
        }
      })()}
      {(() => {
        if (valuesFetch.length > 0) {
          return (
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
                  <Line data={dataChartTotalAssets} />
                </div>
                <div className="col-6">
                  <h3>
                    Net Income
                    <span className="paranthesis">
                      (Currency: {firmBackground.currency_sym}, Decimal Unit:{' '}
                      {firmBackground.decimal})
                    </span>{' '}
                  </h3>
                  <Line data={dataChartNetIncome} />
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-6">
                  <h3>Growth Rate Of Revenues (%)</h3>
                  <Bar data={dataChartAdequacy} />
                </div>
                <div className="col-6">
                  <h3>Gross Margin (%)</h3>
                  <Bar data={dataChartLiquidity} />
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-6">
                  <h3>EBITDA Margin (%)</h3>
                  <Bar data={dataChartGrowthRateOfLoans} />
                </div>
                <div className="col-6">
                  <h3>Profit Margin (%)</h3>
                  <Bar data={dataChartNpl} />
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-6">
                  <h3>ICR (%)</h3>
                  <Bar data={dataChartSpecificReserve} />
                </div>
                <div className="col-6">
                  <h3>DSCR (%)</h3>
                  <Bar data={dataChartLoansToDeposits} />
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-6">
                  <h3>ROA (%)</h3>
                  <Bar data={dataChartLeverage} />
                </div>
                <div className="col-6">
                  <h3>ROE (%)</h3>
                  <Bar data={dataChartNetInterestMargin} />
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-6">
                  <h3>Leverage Ratio</h3>
                  <Bar data={dataChartReturnOnAssets} />
                </div>
              </div>
            </div>
          )
        }
      })()}
      <br />
      <br />
      <br />
      {(() => {
        if (valuesFetch.length > 0) {
          return (
            <div className="container" style={{ backgroundColor: 'white' }}>
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
              <br />
              {getBalanceTable(balanceSheetTable, 'Balance Sheet', false)}
              <br />
              {getIncomeTable(inComeTable, 'Income Statements', true)}
            </div>
          )
        }
      })()}
      <br />
      <br />
      {(() => {
        if (valuesFetch.length > 1) {
          return (
            <div className="container" style={{ backgroundColor: 'white' }}>
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

              <br />
              <table className="table">
                <tbody>
                  <tr>
                    <div id="table-income-label" style={{ width: '310px' }}>
                      <br />

                      {newFinancialFormNamesTable}
                    </div>
                    <td>
                      {mapNumberPositive}
                      {customAnalysisMatrixDisabledTable}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      })()}
    </div>
  )
}

export default RealChart

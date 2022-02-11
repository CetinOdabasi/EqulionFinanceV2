// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Bar, Line } from 'react-chartjs-2'

import { useSelector } from 'react-redux'
import FinancialAnalysisReport from '../components/FinancialAnalysisReport'
import RealAnalysisReport from '../components/RealAnalysisReport'

// const Report = () => {
//   const [dataChartTotalAssets, setDataChartTotalAssets] = useState()
//   const [dataChartNetIncome, setDataChartNetIncome] = useState()
//   const [dataChartGrowthRateOfLoans, setDataChartGrowthRateOfLoans] = useState()
//   const [dataGrossMargin, setDataGrossMargin] = useState()
//   const [dataEbitbaMargin, setDataEbitbaMargin] = useState()
//   const [dataProfitMargin, setDataProfitMargin] = useState()
//   const [dataIcr, setDataIcr] = useState()
//   const [dataDscr, setDataDscr] = useState()
//   const [dataRoa, setDataRoa] = useState()
//   const [dataRoe, setDataRoe] = useState()
//   const [dataLeverageRatio, setLeverageRatio] = useState()

//   const { financial_statements, analysisResult, firmBackground } = useSelector(
//     (state) => state.analysisDataReducer
//   )

//   const myfirm = useSelector((state) => state.myfirm.myfirm)

//   useEffect(() => {
//     const indicatorsBackgroundColor = [
//       'rgba(255, 99, 132, 0.6)',
//       'rgba(54, 162, 235, 0.6)',
//       'rgba(255, 206, 86, 0.6)',
//       'rgba(75, 192, 192, 0.6)',
//       'rgba(153, 102, 255, 0.6)',
//       'rgba(255, 159, 64, 0.6)',
//       'rgba(255, 99, 132, 0.6)',
//     ]

//     const totalAssetsDataSets = [
//       {
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(255, 99, 132, 0.6)',
//         ],
//         fill: false,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'line',
//         data: [],
//       },
//       {
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(255, 99, 132, 0.6)',
//         ],
//         fill: false,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'line',
//         data: [],
//       },
//     ]

//     const netIncomeDataSets = [
//       {
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(255, 99, 132, 0.6)',
//         ],
//         fill: false,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'line',
//         data: [],
//       },
//       {
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(255, 99, 132, 0.6)',
//         ],
//         fill: false,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'line',
//         data: [],
//       },
//     ]

//     const indicatorGrowthRateSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const indicatorGrossMarginSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const ebitdaMarginSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       analysisResult.custom_financial_statements.lenght > 1
//         ? {
//             backgroundColor: indicatorsBackgroundColor,
//             fill: true,
//             label: 'Custom Scenario',
//             title: 'test',
//             chartType: 'bar',
//             data: {},
//           }
//         : [],
//     ]

//     const profitMarginSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const ıcrSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const dscrSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const roaSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const roeSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]
//     const leverageRatioSet = [
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Baseline Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//       {
//         backgroundColor: indicatorsBackgroundColor,
//         fill: true,
//         label: 'Custom Scenario',
//         title: 'test',
//         chartType: 'bar',
//         data: {},
//       },
//     ]

//     const labels = []

//     // Baseline data chart
//     totalAssetsDataSets[0].data = analysisResult.financial_statements.map(
//       (datas) => {
//         labels.push(datas.year)
//         const totalAsetValue = datas.values.find(
//           (item) => item.key === 'total_assets'
//         )
//         return totalAsetValue.value
//       }
//     )

//     netIncomeDataSets[0].data = analysisResult.financial_statements.map(
//       (datas) => {
//         const netIncomeValue = datas.values.find(
//           (item) => item.key === 'net_income'
//         )
//         return netIncomeValue.value
//       }
//     )

//     indicatorGrowthRateSet[0].data = analysisResult.indicators.map((datas) => {
//       const grValue = datas.values.find(
//         (item) => item.label === 'Growth Rate Of Revenues'
//       )
//       return grValue.value
//     })

//     indicatorGrossMarginSet[0].data = analysisResult.indicators.map((datas) => {
//       const gmValue = datas.values.find((item) => item.label === 'Gross Margin')
//       return gmValue.value
//     })

//     ebitdaMarginSet[0].data = analysisResult.indicators.map((datas) => {
//       const emValue = datas.values.find(
//         (item) => item.label === 'EBITDA Margin'
//       )
//       return emValue.value
//     })

//     profitMarginSet[0].data = analysisResult.indicators.map((datas) => {
//       const pmValue = datas.values.find(
//         (item) => item.label === 'Profit Margin'
//       )
//       return pmValue.value
//     })

//     dscrSet[0].data = analysisResult.indicators.map((datas) => {
//       const dscrValue = datas.values.find((item) => item.label === 'DSCR')
//       return dscrValue.value
//     })

//     roaSet[0].data = analysisResult.indicators.map((datas) => {
//       const roaValue = datas.values.find((item) => item.label === 'ROA')
//       return roaValue.value
//     })

//     roeSet[0].data = analysisResult.indicators.map((datas) => {
//       const roeValue = datas.values.find((item) => item.label === 'ROE')
//       return roeValue.value
//     })

//     leverageRatioSet[0].data = analysisResult.indicators.map((datas) => {
//       const lrValue = datas.values.find(
//         (item) => item.label === 'Leverage Ratio'
//       )
//       return lrValue.value
//     })

//     //Custom data Chart

//     totalAssetsDataSets[1].data =
//       analysisResult.custom_financial_statements.map((datas) => {
//         const totalAsetValue = datas.values.find(
//           (item) => item.key === 'total_assets'
//         )
//         return totalAsetValue.value
//       })

//     netIncomeDataSets[1].data = analysisResult.custom_financial_statements.map(
//       (datas) => {
//         const netIncomeValue = datas.values.find(
//           (item) => item.key === 'net_income'
//         )
//         return netIncomeValue.value
//       }
//     )

//     indicatorGrowthRateSet[1].data = analysisResult.custom_indicators.map(
//       (datas) => {
//         const grValue = datas.values.find(
//           (item) => item.label === 'Growth Rate Of Revenues'
//         )
//         return grValue.value
//       }
//     )

//     indicatorGrossMarginSet[1].data = analysisResult.custom_indicators.map(
//       (datas) => {
//         const gmValue = datas.values.find(
//           (item) => item.label === 'Gross Margin'
//         )
//         return gmValue.value
//       }
//     )

//     ebitdaMarginSet[1].data = analysisResult.custom_indicators.map((datas) => {
//       const emValue = datas.values.find(
//         (item) => item.label === 'EBITDA Margin'
//       )
//       return emValue.value
//     })

//     profitMarginSet[1].data = analysisResult.custom_indicators.map((datas) => {
//       const pmValue = datas.values.find(
//         (item) => item.label === 'Profit Margin'
//       )
//       return pmValue.value
//     })

//     dscrSet[1].data = analysisResult.custom_indicators.map((datas) => {
//       const dscrValue = datas.values.find((item) => item.label === 'DSCR')
//       return dscrValue.value
//     })

//     roaSet[1].data = analysisResult.custom_indicators.map((datas) => {
//       const roaValue = datas.values.find((item) => item.label === 'ROA')
//       return roaValue.value
//     })

//     roeSet[1].data = analysisResult.custom_indicators.map((datas) => {
//       const roeValue = datas.values.find((item) => item.label === 'ROE')
//       return roeValue.value
//     })

//     leverageRatioSet[1].data = analysisResult.custom_indicators.map((datas) => {
//       const lrValue = datas.values.find(
//         (item) => item.label === 'Leverage Ratio'
//       )
//       return lrValue.value
//     })

//     setDataChartTotalAssets({
//       labels,
//       datasets: totalAssetsDataSets,
//     })

//     setDataChartNetIncome({
//       labels,
//       datasets: netIncomeDataSets,
//     })

//     setDataChartGrowthRateOfLoans({
//       labels,
//       datasets: indicatorGrowthRateSet,
//     })
//     setDataGrossMargin({
//       labels,
//       datasets: indicatorGrossMarginSet,
//     })
//     setDataEbitbaMargin({
//       labels,
//       datasets: ebitdaMarginSet,
//     })
//     setDataProfitMargin({
//       labels,
//       datasets: profitMarginSet,
//     })
//     setDataIcr({
//       labels,
//       datasets: ıcrSet,
//     })
//     setDataDscr({
//       labels,
//       datasets: dscrSet,
//     })
//     setDataRoa({
//       labels,
//       datasets: roaSet,
//     })
//     setDataRoe({
//       labels,
//       datasets: roeSet,
//     })
//     setLeverageRatio({
//       labels,
//       datasets: leverageRatioSet,
//     })
//   }, [analysisResult])

//   return (
//     <div>
//       {(() => (
//         <div
//           class="container"
//           style={{ paddingBottom: '10px', paddingTop: '10px' }}
//         >
//           <div class="row">
//             <div class="col-6">
//               <h5>
//                 Business Name:
//                 <span style={{ color: '#FD91AA' }}>{myfirm.businessName}</span>
//               </h5>
//               <h5>
//                 Industry:
//                 <span style={{ color: '#FD91AA' }}>
//                   {firmBackground.industry}
//                 </span>
//               </h5>
//               <h5>
//                 Country of Operations:
//                 <span style={{ color: '#FD91AA' }}>
//                   {firmBackground.country}
//                 </span>
//               </h5>
//             </div>
//             <div class="col-6"></div>
//           </div>
//         </div>
//       ))()}
//       {analysisResult ? (
//         <div className="container" style={{ backgroundColor: 'white' }}>
//           <div className="row justify-content-center">
//             <div className="col-6">
//               <h3>
//                 Total Assets
//                 <span className="paranthesis">
//                   (Currency: {firmBackground.currency_sym}, Decimal Unit:{' '}
//                   {firmBackground.decimal})
//                 </span>
//               </h3>
//               <Line data={dataChartTotalAssets} />
//             </div>
//             <div className="col-6">
//               <h3>
//                 Net Income
//                 <span className="paranthesis">
//                   (Currency: {firmBackground.currency_sym}, Decimal Unit:{' '}
//                   {firmBackground.decimal})
//                 </span>{' '}
//               </h3>
//               <Line data={dataChartNetIncome} />
//             </div>
//           </div>
//           <hr />
//           <div className="row justify-content-center">
//             <div className="col-6">
//               <h3>Growth Rate Of Revenues (%)</h3>
//               <Bar data={dataChartGrowthRateOfLoans} />
//             </div>
//             <div className="col-6">
//               <h3>Gross Margin (%)</h3>
//               <Bar data={dataGrossMargin} />
//             </div>
//           </div>
//           <hr />
//           <div className="row justify-content-center">
//             <div className="col-6">
//               <h3>EBITDA Margin (%)</h3>
//               <Bar data={dataEbitbaMargin} />
//             </div>
//             <div className="col-6">
//               <h3>Profit Margin (%)</h3>
//               <Bar data={dataProfitMargin} />
//             </div>
//           </div>
//           <hr />
//           <div className="row justify-content-center">
//             <div className="col-6">
//               <h3>ICR (%)</h3>
//               <Bar data={dataIcr} />
//             </div>
//             <div className="col-6">
//               <h3>DSCR (%)</h3>
//               <Bar data={dataDscr} />
//             </div>
//           </div>
//           <hr />
//           <div className="row justify-content-center">
//             <div className="col-6">
//               <h3>ROA (%)</h3>
//               <Bar data={dataRoa} />
//             </div>
//             <div className="col-6">
//               <h3>ROE (%)</h3>
//               <Bar data={dataRoe} />
//             </div>
//           </div>
//           <hr />
//           <div className="row justify-content-center">
//             <div className="col-6">
//               <h3>Leverage Ratio</h3>
//               <Bar data={dataLeverageRatio} />
//             </div>
//           </div>
//         </div>
//       ) : (
//         ''
//       )}

//       <br />
//       <br />
//       <br />
//       {analysisResult ? (
//         <div className="container" style={{ backgroundColor: 'white' }}>
//           <h1 className="FinancialStatementTitle">
//             Financial Statements{' '}
//             <span className="paranthesis">
//               (Currency:
//               <span style={{ color: '#85BB65' }}>
//                 {' '}
//                 {firmBackground.currency_sym}
//               </span>
//               , Decimal Unit:
//               <span style={{ color: '#85BB65' }}>
//                 {' '}
//                 {firmBackground.decimal})
//               </span>
//             </span>
//           </h1>
//           <br />

//           {financial_statements[0]?.values.slice(0, 11).map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td
//                 className={
//                   row.label === 'Total Assets' ||
//                   row.label === 'Total Liabilities And Equity'
//                     ? 'fw-bold'
//                     : ''
//                 }
//               >
//                 {row.label}
//               </td>
//               {analysisResult?.financial_statements?.map(
//                 (yearData, columnIndex) => (
//                   <>
//                     <td key={columnIndex}>
//                       <input
//                         type="number"
//                         defaultValue={0}
//                         value={yearData.values[rowIndex].value}
//                         disabled
//                       />
//                     </td>
//                   </>
//                 )
//               )}
//             </tr>
//           ))}
//         </div>
//       ) : (
//         ''
//       )}
//     </div>
//   )
// }
// export default Report

const Report = () => {
  const { firmBackground } = useSelector((state) => state.analysisDataReducer)

  // const report = (firmBackground.industry = 'Finance & Insurance') ? (
  //   <FinancialAnalysisReport />
  // ) : (
  //   <RealAnalysisReport />
  // )
  console.log(firmBackground.industry)
  return (
    <div>
      {firmBackground.industry === 'Finance & Insurance' ? (
        <FinancialAnalysisReport />
      ) : (
        <RealAnalysisReport />
      )}
    </div>
  )
}

export default Report

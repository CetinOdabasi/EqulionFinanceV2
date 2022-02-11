import { useSelector } from 'react-redux'

const ProgressTable = () => {
  const { rating_valuation, custom_valuation } = useSelector(
    (state) => state.analysisDataReducer.analysisResult
  )

  return (
    <div className="container">
      <div className="value-progress-container">
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Baseline
              </th>
              <th scope="col" className="text-center">
                Custom Scenario
              </th>
            </tr>
          </thead>
          <tbody>
            {rating_valuation?.map((item, index) => (
              <tr>
                <td className="text-center">
                  {item.label} : {item.value}
                </td>
                <td className="text-center">
                  {custom_valuation[index].label} :{' '}
                  {custom_valuation[index].value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProgressTable

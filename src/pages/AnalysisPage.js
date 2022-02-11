import { useState } from 'react'
import AnalysisButtons from '../components/AnalysisButtons'
import ProgressTable from '../components/ProgressTable'
import TabsRouter from '../components/TabsRouter'
import BusinessPlan from './BusinessPlan'
import CustomScenario from './CustomScenario'
import FinancialStatements from './FinancialStatements'
import Firmbackground from './Firmbackground'
import FxPosition from './FxPosition'
import MaturityShortTerm from './MaturityShortTerm'
import Report from './Report'

const AnalysisPage = () => {
  const [tab, setTab] = useState(0)

  return (
    <>
      <TabsRouter activeTab={tab} setActiveTab={setTab} />
      {tab !== 0 && <ProgressTable />}
      {tab === 0 ? (
        <Firmbackground changePage={() => setTab(1)} />
      ) : tab === 1 ? (
        <FinancialStatements />
      ) : tab === 2 ? (
        <FxPosition />
      ) : tab === 3 ? (
        <MaturityShortTerm />
      ) : tab === 4 ? (
        <BusinessPlan />
      ) : tab === 5 ? (
        <CustomScenario />
      ) : tab === 6 ? (
        <Report />
      ) : null}

      {tab !== 0 && <AnalysisButtons activeTab={tab} setActiveTab={setTab} />}
    </>
  )
}

export default AnalysisPage

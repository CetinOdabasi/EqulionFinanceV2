const tabsNames = [
  'Firm Background',
  'Financial Statements',
  'Fx Position',
  'Maturity Short Term',
  'Business Plan',
  'Custom Scenario',
  'Report',
]

const TabsRouter = ({ activeTab, setActiveTab }) => (
  <div className="d-flex container">
    {tabsNames.map((item, index) => (
      <div
        onClick={activeTab !== 0 && (() => setActiveTab(index))}
        className={`tab ${activeTab === index ? 'active' : ''}`}
        key={index}
      >
        {item}
      </div>
    ))}
  </div>
)

export default TabsRouter

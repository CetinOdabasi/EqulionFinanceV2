import '../static/css/homebuttongroup.css'
import { Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import analysis from '../static/img/analysis.png'
import equities from '../static/img/equities.png'
import loans from '../static/img/loans.png'
import sellproducts from '../static/img/sellproducts.png'
import buyproducts from '../static/img/buyproducts.png'

const HomeButtonGroup = () => (
  <div className="homebuttoncontent">
    <div className="buttoncard" id="cardbutton">
      <div className="card-body">
        <h5 className="cardtext">
          All what you need to grow your business We provide various free tools
          for you to
        </h5>
        <p className="cardtext">
          (i) estimate the valuation and credit risk rating of your company,
          (ii) provide/receive loans and equities, and (iii) buy/sell products
        </p>
        <Button href="/analysis" className="buttonlink">
          <img className="button_logo" src={analysis} alt={'img_button'} />
          <h2 className="buttonname">Analysis</h2>
          <p>
            Estimate the valuation and credit risk rating of your business by
            incorporating macroeconomic view and your business plan into your
            company’s business & financial profile
          </p>
        </Button>
        <Button data-tip="Coming Soon!" className="buttonlink">
          <ReactTooltip />
          <img className="button_logo" src={equities} alt={'img_button'} />
          <h2 className="buttonname">Equity Request</h2>
          <p>
            Estimate the valuation and credit risk rating of your business by
            incorporating macroeconomic view and your business plan into your
            company’s business & financial profile
          </p>
        </Button>
        <Button data-tip="Coming Soon!" className="buttonlink">
          <ReactTooltip />
          <img className="button_logo" src={loans} alt={'img_button'} />
          <h2 className="buttonname">Loan Request</h2>
          <p>
            Estimate the valuation and credit risk rating of your business by
            incorporating macroeconomic view and your business plan into your
            company’s business & financial profile
          </p>
        </Button>
        <Button data-tip="Coming Soon!" className="buttonlink">
          <ReactTooltip />
          <img className="button_logo" src={sellproducts} alt={'img_button'} />
          <h2 className="buttonname">Product Sales</h2>
          <p>
            Estimate the valuation and credit risk rating of your business by
            incorporating macroeconomic view and your business plan into your
            company’s business & financial profile
          </p>
        </Button>
        <Button data-tip="Coming Soon!" className="buttonlink">
          <ReactTooltip />
          <img className="button_logo" src={buyproducts} alt={'img_button'} />
          <h2 className="buttonname">Product Purchases</h2>
          <p>
            Estimate the valuation and credit risk rating of your business by
            incorporating macroeconomic view and your business plan into your
            company’s business & financial profile
          </p>
        </Button>
      </div>
    </div>
  </div>
)

export default HomeButtonGroup

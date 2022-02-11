import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../static/css/homebackground.css'
import mainpage from '../static/img/main_page.png'
import scroll from '../static/img/scroll.png'

const HomeBackground = () => (
  <div className="backgroundcontent">
    <div className="cardcenter">
      <img className="card-img-top" src={mainpage} alt={'mainpage'}></img>
      <div className="cardhome">
        <div className="card-body">
          <h5 className="card-title">Access to finance and markets</h5>
          <h3 className="card-title2">
            All what you need to grow your business
          </h3>
          <div>
            <Link id="okbutton" to="/analysis">
              <p className="backgroundbutton">
                Estimate My Valuation and Rating
              </p>
            </Link>
            <img className="mainpgn2" src={scroll} alt={'scroll'} />
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default HomeBackground

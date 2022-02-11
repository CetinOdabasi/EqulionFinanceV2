import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import '../static/css/myfirm.css' // kaldır style css ekle
import { Button } from 'react-bootstrap' // htlm button yaz
import ReactTooltip from 'react-tooltip'
import getMyFirms from '../redux/actions/myshowfirmactions' //api callsta yaz

const MyFirm = () => {
  const dispatch = useDispatch()

  const myfirm = useSelector((state) => state.myfirm.myfirm)

  useEffect(() => {
    dispatch(getMyFirms())
  }, [])

  return (
    <div className="container">
      <br />
      <div className="row">
        <nav
          className="nav nav-pills nav-fill"
          style={{ backgroundColor: 'white' }}
        >
          <Link className="myfirm-button nav-item nav-link" to="/updatemyinfo">
            Update Firm Info
          </Link>
          <button
            className="myfirm-button btn nav-item nav-link"
            data-tip="Coming Soon!"
          >
            {' '}
            <ReactTooltip />
            Made Proposalss
          </button>
          <Link className="myfirm-button nav-item nav-link" to="/analysis">
            Firm Analysis
          </Link>
        </nav>

        <div className="col-md-4">
          <br />
          <div className="fieldContainer shadow bg-white radius-lg my-firm-container ">
            <h3 className="containerHeader pb-10">Business Information</h3>
            <div className="FirmField">Firm Name : {myfirm.company_name}</div>
            <div className="FirmField">City : {myfirm.city}</div>
            <div className="FirmField">E-Mail : {myfirm.email}</div>
            <div className="FirmField">
              Firm Website : {myfirm.company_web_site}
            </div>
          </div>
        </div>
        <div className=" col-md-4 ">
          <br />
          <div className="fieldContainer shadow bg-white radius-lg my-firm-container">
            <h3 className="containerHeader pb-10">
              Business Responsible Information
            </h3>
            <div className="FirmField">
              Role : {myfirm.your_role_at_the_company}
            </div>
            <div className="FirmField">First Name : {myfirm.first_name}</div>
            <div className="FirmField">Last Name : {myfirm.last_name}</div>
          </div>
        </div>
        <div className="col-md-4">
          <br />
          <div className="fieldContainer shadow bg-white radius-lg  my-firm-container">
            <h3 className="containerHeader pb-10">Business Details</h3>
            <div className="FirmField">
              Business Description : {myfirm.business_description}
            </div>
            <div className="FirmField">
              Firm Valuation: {myfirm.firmValuation}{' '}
              {myfirm.decimalUnit && myfirm.decimalUnit !== 'None'
                ? `${myfirm.decimalUnit.substr(
                    0,
                    myfirm.decimalUnit.length - 1
                  )} ${myfirm.currencySymbol}`
                : myfirm.currencySymbol}
            </div>
            <div className="FirmField">Date Joined : {myfirm.date_joined}</div>
          </div>
        </div>
      </div>
      <div className="container" style={{ backgroundColor: 'white' }}>
        <nav className="nav nav-pills nav-fill">
          <Button
            className="myfirm-button nav-item nav-link"
            data-tip="Coming Soon!"
          >
            <ReactTooltip />
            Loans Requests
          </Button>
          <Button
            className="myfirm-button nav-item nav-link"
            data-tip="Coming Soon!"
          >
            <ReactTooltip /> Equity Requests
          </Button>
          <Button
            className="myfirm-button nav-item nav-link"
            data-tip="Coming Soon!"
          >
            <ReactTooltip />
            Product Sales
          </Button>
          <Button
            className="myfirm-button nav-item nav-link"
            data-tip="Coming Soon!"
          >
            <ReactTooltip />
            Product Purchases
          </Button>
        </nav>
      </div>
    </div>
  )
}

export default MyFirm

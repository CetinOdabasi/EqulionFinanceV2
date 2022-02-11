import ReactTooltip from 'react-tooltip'
import {
  NavDropdown,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import '../static/css/navi.css'
import { logout } from '../redux/actions/auth'

const Navi = () => {
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const authLinks = (
    <Nav className="ms-auto">
      <Nav.Link href="/myfirm">My Firm</Nav.Link>
      <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
    </Nav>
  )

  const guestLinks = (
    <Nav className="ms-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Sign Up</Nav.Link>
    </Nav>
  )

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ background: '#012169' }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/homepage">
          <span style={{ color: '/#A38AF3', fontSize: '30px' }}>
            Equ<span style={{ color: '#F73681' }}>lion</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ paddingLeft: '20px' }}
        >
          <Nav className="me-auto">
            <Nav.Link href="/analysis">Analysis</Nav.Link>
            <NavDropdown
              title="Loan Requests"
              id="collasible-nav-dropdown"
              data-tip="Coming Soon!"
            >
              <NavDropdown.Item>
                <ReactTooltip />
                Loan Requests
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Equity Requests</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Product Purchases</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Product Sales</NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                style={{ height: '2.4em', marginLeft: '10px' }}
              />
              <Button variant="outline-primary" size="sm">
                Search
              </Button>
            </Form>
          </Nav>
          {auth.token ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navi

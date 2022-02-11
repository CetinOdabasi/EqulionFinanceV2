/* eslint-disable no-unused-vars */
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!auth.token) {
        return <Redirect to="/homepage" />
      }
      return <Component {...props} />
    }}
  />
)

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)

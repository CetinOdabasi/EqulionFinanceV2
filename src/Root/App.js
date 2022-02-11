import '../static/css/app.css'
import {
  BrowserRouter,
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import AnalysisPage from '../pages/AnalysisPage'
import MyFirm from '../pages/MyFirm'
import Register from '../pages/Register'
import Login from '../pages/Login'
import HomePage from '../pages/HomePage'
import Navi from '../components/Navi'
import PrivateRoute from '../components/PrivateRoute'

const App = () => {
  return (
    <div>
      <Navi />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={MyFirm} />
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/myfirm" component={MyFirm} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/analysis" component={AnalysisPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

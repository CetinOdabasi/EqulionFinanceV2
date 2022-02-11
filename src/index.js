import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './Root/App'
import './static/css/app.css'
import { Provider } from 'react-redux'
import { configureStore, persistor } from './redux/index'
import { PersistGate } from 'redux-persist/integration/react'
import './assets/styles/style.scss'

ReactDOM.render(
  <Provider store={configureStore}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
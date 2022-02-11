import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'

const initialState = {}

const middleware = [thunk]

const persistConfig = persistReducer(
  {
    key: 'persisted',
    storage,
    debug: true,
    whitelist: ['auth'],
  },
  rootReducer
)

const configureStore = createStore(
  persistConfig,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  // applyMiddleware(...middleware)
)

const persistor = persistStore(configureStore)

export { configureStore, persistor }

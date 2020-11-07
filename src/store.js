import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { logInReducer } from './reducers/userReducers'
import { screenRoute } from './reducers/routeReducers'
import { updateCurrentRecordReducer, fieldDataReducer, loadReportCriteria } from './reducers/recordReducers'

const reducers = combineReducers({
  loggedIn: logInReducer,
  screenRoute,
  currentRec: updateCurrentRecordReducer,
  fieldData: fieldDataReducer,
  reportCriteria: loadReportCriteria
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
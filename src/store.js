import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { login } from './reducers/userReducers'
import { screenRoute } from './reducers/routeReducers'
import { updateCurrentRecordReducer, fieldDataReducer } from './reducers/recordReducers'

const reducers = combineReducers({
  login,
  screenRoute,
  currentRec: updateCurrentRecordReducer,
  fieldData: fieldDataReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
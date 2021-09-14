import { combineReducers } from 'redux'

import car from './car/reducer'
import error from './error/reducer'
import loading from './loading/reducer'

const rootReducer = combineReducers({
  car,
  error,
  loading,
})

export default rootReducer

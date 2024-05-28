import { combineReducers } from 'redux'
import reducer from './initReducer'
const rootReducer = combineReducers({
  // reducer: reducer.IndexReducer,
  // reducerFilter: reducer.ReducerFilter
  reducer: reducer
})

export default rootReducer
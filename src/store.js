import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import seatingReducer from './state/seatingReducer'
const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducer = combineReducers({
    tableMap: seatingReducer
})


const rootReducer = (state, action) => {
  return reducer(state, action)
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store
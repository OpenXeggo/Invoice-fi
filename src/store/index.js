import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers'

function configureStore() {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middlewareEnhancer));

  return store
}

export const store = configureStore();
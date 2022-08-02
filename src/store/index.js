import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers'

function configureStore() {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, composedEnhancers)

  return store
}

export const store = configureStore();
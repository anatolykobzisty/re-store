import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

const logMiddleware = ({ getState, dispatch }) => next => action => {
  console.log(action.type, getState());
  // next === dispatch
  return next(action);
};

const stringMiddleware = () => next => action => {
  if (typeof action === 'string') {
    // next === dispatch
    return next({ type: action });
  }
  return next(action);
};

const store = createStore(reducer, applyMiddleware(logMiddleware, stringMiddleware));

store.dispatch('HELLO_WORLD');

export default store;

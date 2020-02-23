import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

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

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
);

const delayedActionCreator = timeout => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: 'DELAYED_ACTION',
      }),
    timeout
  );
};

store.dispatch(delayedActionCreator(3000));

export default store;

import { createStore, compose } from 'redux';
import reducer from './reducers';

const stringEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  const origignalDispatch = store.dispatch;
  store.dispatch = action => {
    if (typeof action === 'string') {
      return origignalDispatch({ type: action });
    }

    return origignalDispatch(action);
  };
  return store;
};

const logEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  const origignalDispatch = store.dispatch;
  store.dispatch = action => {
    console.log(action.type);
    return origignalDispatch(action);
  };
  return store;
};

// monkey patching

// const origignalDispatch = store.dispatch;
// store.dispatch = action => {
//   if (typeof action === 'string') {
//     return origignalDispatch({ type: action });
//   }

//   return origignalDispatch(action);
// };

const store = createStore(reducer, compose(stringEnhancer, logEnhancer));

store.dispatch('HELLO_WORLD');

export default store;

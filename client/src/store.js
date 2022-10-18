import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};
/**
 * initial state is used to represent the state when the store 
 * is first loaded, without dispatching the action
 */
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/**
 * bofore subscription
 */
let currentState = store.getState();
/**
 * subscribe the latest state
 */
store.subscribe(() => {
 
  let previousState = currentState;
  currentState = store.getState();
  // when the auth state is chnaged get fresh, set token to the header
  // localstorage

  // the the app refreshs go to the app.js
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;

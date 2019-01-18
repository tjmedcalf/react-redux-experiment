import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export const history = createHistory();
const connectRouterHistory = connectRouter(history);

export default function configureStore(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);

  const store = createStore(
    connectRouterHistory(rootReducer),
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant(), reactRouterMiddleware)
  );

  if(module.hot) {

    //Enable Webpack hot module replacement for reducers.
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(connectRouterHistory(nextReducer));
    });
  }

  return store;
}

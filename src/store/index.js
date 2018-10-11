import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createHistory();
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.REACT_APP_NODE_ENV !== 'production') middleware.push(logger);

export default createStore(
	connectRouter(history)(rootReducer),
	composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
);

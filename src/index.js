import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'sanitize.css/sanitize.css';
import './index.css';

if (process.env.NODE_ENV !== 'development') {
	console.log = () => {};
	console.warn = () => {};
	console.error = () => {};
}

console.log('Store:', store);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();

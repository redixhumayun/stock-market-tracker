import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import remoteActionMiddleware from './remote_action_middleware.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';

import reducer from './reducers/reducer.js';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket), thunk, createLogger({
	collapsed: true, 
	stateTransformer: state => state.toJS()
}))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state => {
	store.dispatch({
		type: 'SET_TICKERS', 
		state
	});
});

ReactDOM.render(
	<Provider store={store}>
  		<App />
	</Provider>,
  document.getElementById('root')
);

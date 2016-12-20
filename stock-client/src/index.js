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
import {fetchData} from './actions/actions.js';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket), thunk, createLogger({
	collapsed: true, 
	stateTransformer: state => state.toJS()
}))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state => { //need to clean up this code
	let date_flag = false; //using this flag to check for when date changes and when to fetch data from API again
	let date = state.datePeriod; 

	//this if statement is used to check if datePeriod has been set, and to set the date_flag to true if dates do not match
	if(store.getState().get('datePeriod') && date !== store.getState().get('datePeriod')) {date_flag = true};

	store.dispatch({
		type: 'SET_STATE', 
		state
	});

	//if the date flag is true, data needs to be fetched for the new datePeriod
	if(date_flag === true) {
		store.dispatch(fetchData(store.getState()));
	}

	let firstItem = store.getState().get('data').keySeq().first(); //this will select the first key from the data key 

	//if the data object exists and the AAPL key is null, then the isFetching flag is checked and data needs to be fetched
	if(store.getState().get('data') && store.getState().getIn(['data', firstItem]).size === 0){
		if(store.getState().get('isFetching') !== true) {
			store.dispatch(fetchData(store.getState()));
		}
	}
});


ReactDOM.render(
	<Provider store={store}>
  		<App />
	</Provider>,
  document.getElementById('root')
);

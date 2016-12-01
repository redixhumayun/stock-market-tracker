import {List, Map, fromJS} from 'immutable';
import yahooFinance from 'yahoo-finance';

import {success} from '../actions/actions.js';

export function setTickers(state = Map(), entries) {
	const tickers = List(entries);
	return state.set('tickers', tickers);
}

export function addTicker(state, entry) {
	return state.updateIn(['tickers'], tickerArray => tickerArray.push(entry));
}

export function removeTicker(state, entry) {
	const index = state.get('tickers').findIndex(ticker => {
		return ticker === entry
	});
	return state.deleteIn(['tickers', index]);
}

export function addTickerKeys(state) {
	const tickerArray = state.get('tickers');
	let newState = Map();
	for(let i = 0; i < tickerArray.size; i++){
		newState = state.setIn(['data', tickerArray.get(i)], Map());
		state = state.concat(newState);
		if(i === tickerArray.size - 1){
			return state;
		}
	}
}


export function requestAPIData(state, tickerArray){
	return dispatch => {
		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: '2012-01-01', 
					to: '2012-01-05', 
					period: 'd'
				}, (err, quotes) => {
					throw new Error('err');
				}).then(result => {
					addDataToKeysFunction(state, result, function(return_data){
						dispatch(success());
					});
				})
			}
			
		}

function addDataToKeysFunction(state, data, done){
	let new_state = state;
	for(let key in data){
		new_state = state.setIn(['data', key], data[key]);
		state = state.merge(new_state);
	}
	done(state);
}








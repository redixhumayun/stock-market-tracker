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
	state = state.delete('data'); //resetting the data object because old ticker data needs to be removed
	let newState = Map();
	for(let i = 0; i < tickerArray.size; i++){
		newState = state.setIn(['data', tickerArray.get(i)], Map());
		state = state.concat(newState);
		if(i === tickerArray.size - 1){
			return state;
		}
	}
}

export function addDataToState(state, data){
	let new_state = state;
	for(let key in data){
		new_state = state.setIn(['data', key], data[key]);
		state = state.merge(new_state);
	}
	return state;
}








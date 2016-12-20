import yahooFinance from 'yahoo-finance';
import _ from 'lodash';
import moment from 'moment';

import datesGenerator from '../utils/utils.js';

export function success() {
  return {
    type: 'FETCH_DATA_SUCCESS', 
  }
}

export function fetching() {
	return {
		type: 'FETCHING', 
	}
}

export function addDataToState(state, data) {
	return {
		type: 'ADD_DATA_TO_STATE', 
		state, 
		data
	}
}

function removeTicker(state, ticker) {
	return {
		type: 'REMOVE_TICKER', 
		state, 
		ticker
	}
}

function removeTickerKey(state, ticker) {
	return {
		type: 'REMOVE_KEY_VALUE_PAIR', 
		ticker
	}
}

//written only for the mock store using immutable object getters and setters
export function fetchDataMock(state, tickerArray) {
	return dispatch => {
		dispatch(fetching());
		let period = state.get('datePeriod') ? state.get('datePeriod') : 'm';
		let fromDate = datesGenerator(period);
		if(period !== 'd') {period = 'm'};
		let toDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: fromDate, 
					to: toDate, 
					period: period
				}).then(result => {
					_.each(result, (quotes, symbol) => {
						if(quotes.length === 0) {
							delete result[symbol];
							dispatch(removeTicker(state, symbol));
							dispatch(removeTickerKey(state, symbol));
						}
					})
					return result;
				})
		}
}

//written for actual JSON data coming in when the app is live
export function fetchData(state, tickerArray) { 
	return dispatch => {
		dispatch(fetching());
		let period = state.datePeriod ? state.datePeriod : 'm';
		let fromDate = datesGenerator(period);
		if(period !== 'd') {period = 'm'};
		let toDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: fromDate, 
					to: toDate, 
					period: period
				}).then(result => {
					_.each(result, (quotes, symbol) => {
						if(quotes.length === 0) {
							delete result[symbol];
							dispatch(removeTicker(state, symbol));
							dispatch(removeTickerKey(state, symbol));
						}
					})
					dispatch(success());
					return result;
				})
		}
}
import yahooFinance from 'yahoo-finance';
import _ from 'lodash';

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

//written only for the mock store using immutable object getters and setters
export function fetchDataMock(state, tickerArray) {
	return dispatch => {
		dispatch(fetching());
		let period = state.get('datePeriod') ? state.get('datePeriod') : 'm';
		let fromDate = state.get('from') ? state.get('from') : '2016-01-01';
		let toDate = state.get('to') ? state.get('to') : '2016-03-30';
		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: fromDate, 
					to: toDate, 
					period: period
				}).then(result => {
					_.each(result, (quotes, symbol) => {
						if(quotes.length === 0) {

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
		let fromDate = state.from ? state.from : '2016-01-01';
		let toDate = state.to ? state.to : '2016-03-30';
		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: fromDate, 
					to: toDate, 
					period: period
				}).then(result => {
					return result;
				})
		}
}
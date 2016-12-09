import yahooFinance from 'yahoo-finance';

export function success() {
  return {
    type: 'FETCH_DATA_SUCCESS'
  }
}

export function addDataToState(state, data) {
	return {
		type: 'ADD_DATA_TO_STATE', 
		state, 
		data
	}
}

export function fetchData(state, tickerArray) { //the state here is a mutable JSON object because it has not hit reducers yet
	return dispatch => {
		let period = state.datePeriod;
		if(!period){
			period = 'd';
		}
		let fromDate = state.from ? state.from : '2016-01-01';
		let toDate = state.to ? state.to : '2016-03-30';
		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: fromDate, 
					to: toDate, 
					period: period
				}).then(result => {
					dispatch(success());
					return result;
				})
			}
}
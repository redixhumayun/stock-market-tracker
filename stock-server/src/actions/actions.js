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

export function fetchData(state, tickerArray) {
	console.log(state);
	console.log(tickerArray);
	return dispatch => {
		return 	yahooFinance.historical({
					symbols: tickerArray, 
					from: '2012-01-01', 
					to: '2012-01-05', 
					period: 'd'
				}).then(result => {
					console.log(result);
					dispatch(success());
					return result;
				})
			}
}
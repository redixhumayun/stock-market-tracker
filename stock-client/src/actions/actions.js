export function addNewTicker(state, ticker){
	return {
		type: 'ADD_TICKER', 
		state, 
		ticker, 
		meta: {remote: true}
	}
}

export function removeTicker(state, ticker) {
	return {
		type: 'REMOVE_TICKER', 
		state, 
		ticker, 
		meta: {remote: true}
	}
}

export function addKeysAndData(state) { //This is the function that will add key value pairs and also data corresponding to each
	return dispatch => {
		dispatch(addKeyValuePairs(state));
	}
}

export function changeDatePeriodAndFetchData(state, datePeriod) {
	return dispatch => {
		dispatch(changeDatePeriod(state, datePeriod));
	}
}

function changeDatePeriod(state, datePeriod) {
	return {
		type: 'CHANGE_DATE_PERIOD', 
		state, 
		datePeriod, 
		meta: {remote: true}
	}
}

function addKeyValuePairs(state) {
	return {
		type: 'ADD_KEY_VALUE_PAIRS', 
		state,
		meta: {remote: true}
	}
}

export function fetchData(state){
	return {
		type: 'FETCH_AND_ADD_DATA', 
		state, 
		tickerArray: state.get('tickers'),
		meta: {remote: true}
	}
}
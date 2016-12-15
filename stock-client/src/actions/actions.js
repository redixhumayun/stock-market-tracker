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
		dispatch(fetchData(state));
	}
}

function addKeyValuePairs(state) {
	return {
		type: 'ADD_KEY_VALUE_PAIRS', 
		state,
		meta: {remote: true}
	}
}

function fetchData(state){
	return {
		type: 'FETCH_AND_ADD_DATA', 
		state, 
		tickerArray: state.get('tickers'),
		meta: {remote: true}
	}
}
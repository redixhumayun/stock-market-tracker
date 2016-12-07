export function addNewTicker(state, ticker){
	return {
		state, 
		ticker
	}
}

export function addKeysAndData(state) {
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
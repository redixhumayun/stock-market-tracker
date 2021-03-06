import {setState, addTicker, removeTicker, addTickerKeys, removeTickerKey, addDataToState, fetchingData, fetchedData, changeDatePeriod} from './core.js';

import {Map} from 'immutable';

export default function (state = Map(), action) {
	switch(action.type) {
		case 'SET_STATE':
			return setState(state, action.state);
		case 'ADD_TICKER':
			return addTicker(state, action.ticker);
		case 'REMOVE_TICKER':
			return removeTicker(state, action.ticker);
		case 'ADD_KEY_VALUE_PAIRS':
			return addTickerKeys(state);
		case 'REMOVE_KEY_VALUE_PAIR':
			return removeTickerKey(state, action.ticker);
		case 'ADD_DATA_TO_STATE':
			return addDataToState(state, action.data);
		case 'FETCHING':
			return fetchingData(state);
		case 'FETCH_DATA_SUCCESS':
			return fetchedData(state);
		case 'CHANGE_DATE_PERIOD':
			return changeDatePeriod(state, action.datePeriod);
		default: 
			return state;
	}
}
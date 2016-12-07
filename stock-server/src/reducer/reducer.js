import {setTickers, addTicker, removeTicker, addTickerKeys, addDataToState} from './core.js';

import {Map} from 'immutable';

export default function (state = Map(), action) {
	switch(action.type) {
		case 'SET_TICKERS':
			return setTickers(state, action.tickers);
		case 'ADD_TICKER':
			return addTicker(state, action.ticker);
		case 'REMOVE_TICKER':
			return removeTicker(state, action.ticker);
		case 'ADD_KEY_VALUE_PAIRS':
			return addTickerKeys(state);
		case 'ADD_DATA_TO_STATE':
			return addDataToState(state, action.data);
		default: 
			return state;
	}
}
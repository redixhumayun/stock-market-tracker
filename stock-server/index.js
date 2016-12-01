import makeStore from './src/store.js';
import {startServer} from './src/store.js';

export const store = makeStore();
startServer(store);

store.dispatch({
	type: 'SET_TICKERS', 
	tickers: ['AAPL', 'TSLA', 'GOOGL']
});
import makeStore from './src/store.js';
import {startServer} from './src/server.js';

export const store = makeStore();
startServer(store);

store.dispatch({
	type: 'SET_STATE', 
	state: {
		tickers: ['AAPL', 'TSLA', 'GOOGL'], 
		from: '2016-01-01', 
		to: '2016-03-31', 
		datePeriod: '3m', 
		isFetching: false
	}
});

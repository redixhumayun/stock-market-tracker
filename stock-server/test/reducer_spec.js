import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer from '../src/reducer/reducer.js';
import {success, fetchData, fetchDataMock} from '../src/actions/actions.js';

describe('reducers', () => {

	it('handles setting of initial tickers', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE', 
			state: Map({
				tickers: List.of('AAPL', 'TSLA', 'GOOGL'), 
				from: '2016-01-01', 
				to: '2016-03-31', 
				datePeriod: 'm', 
				isFetching: false
			})
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('handles converting incoming JSON data to immutable data', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE', 
			state: {
				tickers: ['AAPL', 'TSLA', 'GOOGL'], 
				from: '2016-01-01', 
				to: '2016-03-31', 
				datePeriod: 'm', 
				isFetching: false
			}
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	})

	it('Handles adding a new ticker to the list and also needs to return the correct data key objects', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
		const action = {type: 'ADD_TICKER', ticker: 'FB'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'FB'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('Handles removing a ticker from the list and also needs to return the correct data key objects', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
		const action = {type: 'REMOVE_TICKER', ticker: 'GOOGL'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('adds a new map under the data key where the key is the ticker symbol', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
		const action = {type: 'ADD_KEY_VALUE_PAIRS'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));
	});

	it('changes the state of isFetching while fetching data', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false, 
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));
		const action = {type: 'FETCHING'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: true,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));		
	});

	it('changes the status of isFetching after fetching data', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: true, 
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));
		const action = {type: 'FETCH_DATA_SUCCESS'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));
	})

	it('handles making API requests for the populated lists', () => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		const store = mockStore({});

		const state = fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'],  
			isFetching: false,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		});

		const tickerArray = ['AAPL', 'TSLA', 'GOOGL'];

		return store.dispatch(fetchDataMock(state, tickerArray)).then((data) => {
			const action = {type: 'ADD_DATA_TO_STATE', data: data}
			const nextState = reducer(state, action);
			store.dispatch(success());
			expect(store.getActions().length).to.equal(2);
		});
	});

	it('handles making API requests with a specific data period denoted', () => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		const store = mockStore({});

		const state = fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			dataPeriod: 'm',
			isFetching: false,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		});

		const tickerArray = ['AAPL', 'TSLA', 'GOOGL'];

		return store.dispatch(fetchDataMock(state, tickerArray)).then(data => {
			const action = {type: 'ADD_DATA_TO_STATE', data};
			const nextState = reducer(state, action);
			store.dispatch(success())
			expect(store.getActions().length).to.equal(2);
		})
	});

	it('handles making API requests with a specific time period and data period denoted', () => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		const store = mockStore({});

		const state = fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			dataPeriod: 'm',
			from: '2016-01-01', 
			to: '2016-11-30',
			isFetching: false,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		});

		const tickerArray = ['AAPL', 'TSLA', 'GOOGL'];

		return store.dispatch(fetchDataMock(state, tickerArray)).then(data => {
			const action = {type: 'ADD_DATA_TO_STATE', data};
			const nextState = reducer(state, action);
			store.dispatch(success());
			expect(store.getActions().length).to.equal(2);
		});
	});

	it('handles errors when the data for a specific stock is not found', () => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		const store = mockStore({});

		const state = fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			dataPeriod: 'm',
			from: '2016-01-01', 
			to: '2016-11-30',
			isFetching: false,
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		});

		const tickerArray = ['AAPL', 'TSLA', 'GOOGL', 'RNDM'];

		return store.dispatch(fetchDataMock(state, tickerArray)).then(data => {
			const action = {type: 'ADD_DATA_TO_STATE', data};
			const nextState = reducer(state, action);
			store.dispatch(success());
			expect(store.getActions().length).to.equal(2);
		});
	})
});










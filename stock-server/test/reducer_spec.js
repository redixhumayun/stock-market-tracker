import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer from '../src/reducer/reducer.js';
import {success, fetchData} from '../src/actions/actions.js';

describe('reducers', () => {

	it('Handles setting of initial tickers', () => {
		const initialState = Map();
		const action = {type: 'SET_TICKERS', tickers: List.of('AAPL', 'TSLA', 'GOOGL')};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
	});

	it('Handles adding a new ticker to the list and also needs to return the correct data key objects', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA']
		}));
		const action = {type: 'ADD_TICKER', ticker: 'FB'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'FB']
		}));
	});

	it('Handles removing a ticker from the list and also needs to return the correct data key objects', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
		const action = {type: 'REMOVE_TICKER', ticker: 'GOOGL'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA']
		}));
	});

	it('adds a new map under the data key where the key is the ticker symbol', () => {
		const initialState = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
		const action = {type: 'ADD_KEY_VALUE_PAIRS'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));
	});

	it('handles making API requests for the populated lists', () => {
		const middlewares = [thunk];
		const mockStore = configureStore(middlewares);
		const store = mockStore({});

		const state = fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		});

		const tickerArray = ['AAPL', 'TSLA', 'GOOGL'];

		return store.dispatch(fetchData(state, tickerArray)).then((data) => {
			const action = {type: 'ADD_DATA_TO_STATE', data: data}
			const nextState = reducer(state, action);
			expect(store.getActions().length).to.equal(1);
		});
	});
});










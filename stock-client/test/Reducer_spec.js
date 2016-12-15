import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducers/reducer.js';

describe('reducer', () => {
	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {type: 'SET_STATE', 
		state: Map({
			tickers: List.of('AAPL', 'TSLA', 'GOOGL'), 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		})};

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('handles SET_STATE with a plain JS payload', () => {
		const initialState = Map();
		const action = {type: 'SET_STATE', 
		state: {
				tickers: ['AAPL', 'TSLA', 'GOOGL'], 
				from: '2016-01-01', 
				to: '2016-03-31', 
				datePeriod: 'm', 
				isFetching: false
			}
		}

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('handles SET_STATE without an initial state', () => {
		const state = undefined;
		const action = {type: 'SET_STATE', 
		state: Map({
			tickers: List.of('AAPL', 'TSLA', 'GOOGL'), 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		})};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	})
})
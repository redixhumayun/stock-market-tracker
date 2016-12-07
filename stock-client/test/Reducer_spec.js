import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducers/reducer.js';

describe('reducer', () => {
	it('handles SET_TICKERS', () => {
		const initialState = Map();
		const action = {type: 'SET_TICKERS', 
		state: Map({
			tickers: List.of('AAPL', 'TSLA', 'GOOGL')
		})};

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
	});

	it('handles SET_TICKERS with a plain JS payload', () => {
		const initialState = Map();
		const action = {type: 'SET_TICKERS', 
		state: Map({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		})};

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
	});

	it('handles SET_STATE without an intiial state', () => {
		const state = undefined;
		const action = {type: 'SET_TICKERS', 
		state: Map({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		})};

		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
	})
})
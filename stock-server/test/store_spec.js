import makeStore from '../src/store.js';

import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

describe('store', () => {
	it('is a redux store configured with the right reducer', () => {
		const store = makeStore();

		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type: 'SET_STATE', 
			state: Map({
				tickers: List.of('AAPL', 'TSLA', 'GOOGL'), 
				from: '2016-01-01', 
				to: '2016-03-31', 
				datePeriod: 'm', 
				isFetching: false
			})
		});
		expect(store.getState()).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});
})
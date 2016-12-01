import makeStore from '../src/store.js';

import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

describe('store', () => {
	it('is a redux store configured with the right reducer', () => {
		const store = makeStore();

		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type: 'SET_TICKERS', 
			tickers: List.of('AAPL', 'TSLA')
		});
		expect(store.getState()).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA']
		}));
	});
})
import {List, Map, fromJS} from 'immutable';
import {expect, should} from 'chai';

import {setTickers, addTicker, removeTicker, addTickerKeys, requestAPIData} from '../src/reducer/core.js';

describe('application logic', () => {
	it('Loads a standard set of initial tickers', () => {
		const state = Map();
		const tickers = List.of('AAPL', 'TSLA', 'GOOGL', 'FB');
		const nextState = setTickers(state, tickers);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL', 'FB']
		}));
	});

	it('converts to immutable', () => {
		const state = Map();
		const tickers = ['AAPL', 'TSLA', 'GOOGL', 'FB'];
		const nextState = setTickers(state, tickers);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL', 'FB']
		}));
	})

	it('Handles adding a new ticker and repopulates the list', () => {
		const state = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL', 'FB']
		}));
		const ticker = 'MSFT';
		const nextState = addTicker(state, ticker);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL', 'FB', 'MSFT']
		}));
	});

	it('Handles removing a ticker when required by the user', () => {
		const state = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
		const tickerToRemove = 'GOOGL';
		const nextState = removeTicker(state, tickerToRemove);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA']
		}));
	});

	it('adds a new map under the data key where the key is the ticker symbol', () => {
		const state = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL']
		}));
		const nextState = addTickerKeys(state);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			data: {
				AAPL: Map(), 
				TSLA: Map(), 
				GOOGL: Map()
			}
		}));
	});
})















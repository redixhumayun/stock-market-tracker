import {List, Map, fromJS} from 'immutable';
import {expect, should} from 'chai';

import {setState, addTicker, removeTicker, addTickerKeys, fetchedData, fetchingData} from '../src/reducer/core.js';

describe('application logic', () => {
	it('Loads some intitial data', () => {
		const state = Map();
		const newState = Map({
			tickers: List.of('AAPL', 'TSLA', 'GOOGL', 'FB'), 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		})
		const nextState = setState(state, newState);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL', 'FB'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('converts to immutable', () => {
		const state = Map();
		const newState = {
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}
		const nextState = setState(state, newState);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	})

	it('Handles adding a new ticker and repopulates the list', () => {
		const state = Map(fromJS({
			tickers: ['AAPL', 'TSLA'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
		const ticker = 'MSFT';
		const nextState = addTicker(state, ticker);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA', 'MSFT'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('Handles removing a ticker when required by the user', () => {
		const state = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm',
			isFetching: false
		}));
		const tickerToRemove = 'GOOGL';
		const nextState = removeTicker(state, tickerToRemove);

		expect(nextState).to.equal(fromJS({
			tickers: ['AAPL', 'TSLA'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
	});

	it('adds a new map under the data key where the key is the ticker symbol', () => {
		const state = Map(fromJS({
			tickers: ['AAPL', 'TSLA', 'GOOGL'], 
			from: '2016-01-01', 
			to: '2016-03-31', 
			datePeriod: 'm', 
			isFetching: false
		}));
		const nextState = addTickerKeys(state);

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

	it('changes the status of isFetching while fetching data', () => {
		const state = Map(fromJS({
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
		const nextState = fetchingData(state);

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
	})

	it('changes the status of isFetching after fetching data is done', () => {
		const state = Map(fromJS({
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
		const nextState = fetchedData(state);

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
})















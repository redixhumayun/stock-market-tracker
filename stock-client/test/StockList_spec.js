import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass,Simulate} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {expect} from 'chai';

import StockList from '../src/containers/StockList.js';

describe('StockList', () => {
	it('renders buttons of each stock that are part of the state', () => {
		const stocks = ['AAPL', 'TSLA', 'GOOGL'];

		const component = renderIntoDocument(
			<StockList stocks={stocks} />
		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(3);
	});

	it('invokes a callback function when the X button is clicked', () => {
		const stocks = ['AAPL', 'TSLA', 'GOOGL'];
		let deletedItem;

		const deleteItem = (item) => deletedItem = item;

		const component = renderIntoDocument(
			<StockList stocks={stocks} onClick={deleteItem}/>
		);

		const buttons = scryRenderedDOMComponentsWithClass(component, 'glyphicon-remove');
		Simulate.click(buttons[0]);

		expect(deletedItem).to.equal('AAPL');
	});

	it('removes a stock when the X button is clicked', () => {
		const stocks = ['AAPL', 'TSLA', 'GOOGL'];

		const component = renderIntoDocument(
			<StockList stocks={stocks} />
		);

		const buttons = scryRenderedDOMComponentsWithClass(component, 'glyphicon-remove');

		//add statements to simulate click of x button on GOOGL

		expect(buttons.length).to.equal(2);
	});
})


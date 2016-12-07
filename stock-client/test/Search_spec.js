import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import Search from '../../stock-client/src/containers/Search.js';

import {expect} from 'chai';

describe('Search', () => {
	it('renders a search bar', () => {
		const component = renderIntoDocument(
			<Search />
		);
		const search_bar = scryRenderedDOMComponentsWithClass(component, 'input-group');

		expect(search_bar.length).to.equal(1);
	});

	it('invokes a callback when the Add button is clicked', () => {
		let search_term;
		const clickHandler = (term) => search_term = term;

		const component = renderIntoDocument(
			<Search onClick={clickHandler}/>
		)

		const add_button = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(add_button[0]);

		expect(search_term).to.equal('');
	});

	it('accepts user input from the search button', () => {
		let search_term;
		const clickHandler = (term) => search_term = term;

		const component = renderIntoDocument(
			<Search onClick={clickHandler} />
		);
		const input = component.refs.input;
		Simulate.change(input, {target: {value: 'FB'}});
		expect(input.value).to.equal('FB');
	});

	it('validates user input to make sure of only alphabets', () => {
		let output;
		const component = renderIntoDocument(
			<Search />
		);
		const input = component.refs.input;
		Simulate.change(input, {target: {value: 'FB8$@#%)!'}});
		if(input.value.match(/^[a-zA-Z]+$/)){
			output = true;
		}else{
			output = false;
		}
		expect(output).to.equal(false);
	});

	it('converts all input characters to upper caps', () => {
		const component = renderIntoDocument(
			<Search />
		);
		const input = component.refs.input;
		Simulate.change(input, {target: {value: 'gOOgL'}});
		expect(input.value).to.equal('GOOGL');
	});
})
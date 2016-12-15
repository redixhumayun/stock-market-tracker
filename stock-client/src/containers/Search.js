import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addNewTicker} from '../actions/actions.js';
import SearchComponent from '../components/SearchComponent.js'

export class Search extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '', 
			invalid: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.inputValidation = this.inputValidation.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value.toUpperCase()})
	}

	inputValidation(value){
		return new Promise((resolve, reject) => {
			if(value.match(/^[a-zA-Z]+$/)){
				resolve()
			}else{
				reject()
			}
		})
	}

	render() {
		return (
			<div>
				<SearchComponent onChange={this.handleChange} textValue={this.state.value}
				onClick={() => {
							this.inputValidation(this.state.value).then(() => {
								this.props.onAddTicker(this.props.currentState, this.state.value)
								this.setState({value: ''})
							}, (err) => {
								this.setState({invalid: true})
							})
						}}/>
				<div>
					{this.state.invalid ? <p>Invalid entry</p> : null}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentState: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddTicker: (state, ticker) => {dispatch(addNewTicker(state, ticker))}
	}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Search);
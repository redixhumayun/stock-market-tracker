import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addNewTicker} from '../actions/actions.js';

class Search extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value.toUpperCase()})
	}

	render() {
		return (
			<div className='input-group'>
				<input ref='input' type='text' className='form-control' placeholder='Enter stock ticker' value={this.state.value}
				onChange={this.handleChange}/>
				<span className='input-group-btn'>
					<button className='btn btn-primary' type='submit' 
					onClick={() => {
						this.props.onAddTicker(this.props.currentState, this.state.value)
						this.state.value = ''
					}}>
						Add
					</button>
				</span>
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
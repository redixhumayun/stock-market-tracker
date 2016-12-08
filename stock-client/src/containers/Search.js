import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addNewTicker} from '../actions/actions.js';

class Search extends Component {
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
				<div className='input-group'>
					<input ref='input' type='text' className='form-control' placeholder='Enter stock ticker' value={this.state.value}
					onChange={this.handleChange}/>
					<span className='input-group-btn'>
						<button className='btn btn-primary' type='submit' 
						onClick={() => {
							this.inputValidation(this.state.value).then(() => {
								this.props.onAddTicker(this.props.currentState, this.state.value)
								this.setState({value: ''})
							}, (err) => {
								this.setState({invalid: true})
								console.log(this.state);
							})
						}}>
							Add
						</button>
					</span>
				</div>
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
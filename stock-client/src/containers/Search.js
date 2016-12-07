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
					onClick={() => this.props.onClick(this.state.value)}>
						Add
					</button>
				</span>
			</div>
		)
	}
}

Search.propTypes = {
	onClick: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
	onAddTicker: () => dispatch()
}
 
export default Search;
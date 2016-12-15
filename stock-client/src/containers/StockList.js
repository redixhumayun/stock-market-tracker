import React, {Component} from 'react';
import {connect} from 'react-redux';

import StockListComponent from '../components/StockListComponent.js';
import {addKeysAndData, removeTicker} from '../actions/actions.js';

class StockList extends Component {
	render() {
		if(this.props.stocks){
			return (
				<StockListComponent stocks={this.props.stocks}
				onRemoveClick={(stock) => this.props.removeTicker(this.props.currentState, stock)}/>
			)
		}else{
			return(
				<div>Loading...</div>
			)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const immutable_state = nextProps.currentState._root.entries;
		if(immutable_state[5]){ //this if statement is to check that the data object has been added 
			if(immutable_state[0][1].size > immutable_state[5][1].size || immutable_state[0][1].size < immutable_state[5][1].size){ //this is to update when new ticker added
				return true;
			}
			else if(immutable_state.length >= 5){ //this if statement is fired only when component does not need to update
				return false;
			}
		}
		return true; //this is for initial update
	}

	componentDidUpdate() {
		this.props.fillState(this.props.currentState);
	}
}

const mapStateToProps = (state) => {
	return {
		stocks: state.get('tickers'), 
		isFetching: state.get('isFetching'),
		currentState: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fillState: (state) => {dispatch(addKeysAndData(state))}, 
		removeTicker: (state, ticker) => {dispatch(removeTicker(state, ticker))}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(StockList);


import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading';

import StockListComponent from '../components/StockListComponent.js';
import {addKeysAndData, removeTicker} from '../actions/actions.js';

class StockList extends Component {
	render() {
		if(this.props.stocks){
			return (
				<StockListComponent stocks={this.props.stocks}
				onRemoveClick={(stock) => this.props.removeTicker(this.props.currentState, stock)}/>
			)
		}
		return (
			<div className='loading-icon-stocklist'>
				<Loading type='balls' color='#e3e3e3' />
			</div>
		)
	}

	shouldComponentUpdate(nextProps, nextState) {
		const immutable_state = nextProps.currentState._root.entries;
		if(this.props.stocks === undefined) { //setting this here so that on every page reload and every new client connection, 
			//the stock list will render. Because stock list is undefined initially, will also handle initial render. 
			return true;
		}
		if(immutable_state[0][1].size > immutable_state[5][1].size || immutable_state[0][1].size < immutable_state[5][1].size){ 
		//this is to update when new ticker added.
			return true;
		}
		return false;
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


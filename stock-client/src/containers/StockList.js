import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addKeysAndData} from '../actions/actions.js';

class StockList extends Component {
	constructor(props){
		super(props);
		this.renderButton = this.renderButton.bind(this);
	}

	renderButton(stock){
		return(
			<button key={stock} type='button' className='btn btn-primary stock-btn'>
				{stock}
				<span className='glyphicon glyphicon-remove' aria-hidden='true'
				onClick={() => this.props.onClick(stock)}></span>
			</button>
		)
	}

	render() {
		if(this.props.stocks){
			return (
				<div>
					{this.props.stocks.map(stock => {
						return this.renderButton(stock);
					})}
				</div>
			)
		}else{
			return(
				<div>Loading...</div>
			)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('nextProps', nextProps);
		console.log('nextState', nextState);
		if(nextProps.currentState._root.entries.length >= 2){
			return false;
		}
		return true;
	}

	componentDidUpdate() {
		this.props.fillState(this.props.currentState);
	}
}

StockList.propTypes = {
	onClick: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		stocks: state.get('tickers'), 
		currentState: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fillState: (state) => dispatch(addKeysAndData(state))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(StockList);


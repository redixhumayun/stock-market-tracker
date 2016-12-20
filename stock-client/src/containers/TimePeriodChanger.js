import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changeDatePeriodAndFetchData} from '../actions/actions.js';


class TimePeriodChanger extends Component {
	render() {
		return(
			<div>
				<button type='button' className='btn btn-secondary daily'
				onClick={() => {this.props.renderChart(this.props.currentState, 'd')}}>Daily</button>
				<button type='button' className='btn btn-secondary three-months'
				onClick={() => {this.props.renderChart(this.props.currentState, '3m')}}>3 Months</button>
				<button type='button' className='btn btn-secondary six-months'
				onClick={() => {this.props.renderChart(this.props.currentState, '6m')}}>6 Months</button>
				<button type='button' className='btn btn-secondary one-year'
				onClick={() => {this.props.renderChart(this.props.currentState, 'y')}}>1 Year</button>
			</div>
		)
	}
}
//route onClicks through a server reducer that will change date on state and then fetch data according to the new state

const mapStateToProps = (state) => {
	return {
		currentState: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		renderChart: (state, datePeriod) => {dispatch(changeDatePeriodAndFetchData(state, datePeriod))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriodChanger);
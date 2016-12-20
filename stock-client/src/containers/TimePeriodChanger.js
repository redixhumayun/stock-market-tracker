import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changeDatePeriodAndFetchData} from '../actions/actions.js';


class TimePeriodChanger extends Component {
	render() {
		return(
			<div className='time-period-changer'>
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
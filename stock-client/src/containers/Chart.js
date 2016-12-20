import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import ChartComponent from '../components/ChartComponent.js';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.cleanUpData = this.cleanUpData.bind(this);
		this.convertDate = this.convertDate.bind(this);
	}

	convertDate(date) {
		return (moment(new Date(date)).format('MMM') + ' ' + moment(new Date(date)).format('DD') +', ' + moment(new Date(date)).format('YYYY'));
	}

	cleanUpData(data) {
		const JSON_data = data.toJS();
		let result = [];

		const tickers = Object.keys(JSON_data);

		const days = JSON_data[tickers[0]].length;

		for(let i = 0; i < days; i++) {
			let rowData = {
				date: this.convertDate(JSON_data[tickers[0]][i].date)
			}
			tickers.forEach(ticker => {
				const tickerDayData = JSON_data[ticker][i];
				rowData[ticker] = +(((tickerDayData.open + tickerDayData.close) / 2).toFixed(2));
				rowData[ticker + '_open'] = tickerDayData.open;
				rowData[ticker + '_close'] = tickerDayData.close;
			});
			result.push(rowData);
		}
		return result;
	}

	render() {
		if(this.props.data){
			const data = this.cleanUpData(this.props.data);
			const tickers = Object.keys(this.props.data.toJS());
			return (
				<div>
					<ChartComponent data={data} tickers={tickers}/>
				</div>
			)
		}else{
			return (
				<div>Fetching data</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.get('data')
	}
}

export default connect(mapStateToProps, null)(Chart);
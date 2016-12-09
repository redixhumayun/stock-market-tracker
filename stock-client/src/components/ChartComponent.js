import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import randomColor from 'randomcolor';

const ChartComponent = (props) => {
	return (
		<LineChart width={1200} height={500} data={props.data} margin={{top: 5, right: 100, left: 0, bottom: 5}}>
			<XAxis dataKey='date' />
			<YAxis />
			<CartesianGrid strokeDasharray='3 3' />
			<Tooltip />
			<Legend />
			{props.tickers.map(ticker => {
				return <Line type='monotone' dataKey={ticker} stroke={randomColor()} activeDot={{r:8}} key={ticker}/>
			})}
 		</LineChart>
	)
}

export default ChartComponent;

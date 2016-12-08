import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const colorGenerator = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for(let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const ChartComponent = (props) => {
	return (
		<LineChart width={730} height={250} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			<XAxis dataKey='date' />
			<YAxis />
			<CartesianGrid strokeDasharray='3 3' />
			<Tooltip />
			<Legend />
			{props.tickers.map(ticker => {
				return <Line type='monotone' dataKey={ticker} stroke={colorGenerator()} activeDot={{r:8}} key={ticker}/>
			})}
 		</LineChart>
	)
}

export default ChartComponent;

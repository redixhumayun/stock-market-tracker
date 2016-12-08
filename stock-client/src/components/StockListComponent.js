import React from 'react';


function renderButton(stock, onRemoveClick){
	return(
		<button key={stock} type='button' className='btn btn-primary stock-btn'>
			{stock}
			<span className='glyphicon glyphicon-remove' aria-hidden='true'
			onClick={() => onRemoveClick(stock)}></span>
		</button>
	)
}

const StockListComponent = (props) => {
	return(
		<div>
			{props.stocks.map(stock => {
				return renderButton(stock, props.onRemoveClick);
			})}
		</div>
	)
}

export default StockListComponent;

renderButton.propTypes = {
	stocks: React.PropTypes.array.isRequired, 
	onRemoveClick: React.PropTypes.func.isRequired
}
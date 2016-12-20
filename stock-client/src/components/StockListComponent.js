import React from 'react';


function renderButton(stock, onRemoveClick){
	return(
		<button key={stock} type='button' className='btn btn-warning stock-btn'>
			{stock}
			<span className='glyphicon glyphicon-remove' aria-hidden='true'
			onClick={() => onRemoveClick(stock)}></span>
		</button>
	)
}

const StockListComponent = (props) => {
	return(
		<div className='stock-list'>
			{props.stocks.map(stock => {
				return renderButton(stock, props.onRemoveClick);
			})}
		</div>
	)
}

StockListComponent.propTypes = {
	stocks: React.PropTypes.object.isRequired, 
	onRemoveClick: React.PropTypes.func.isRequired
}

export default StockListComponent;
import React from 'react';

const SearchComponent = (props) => {
	return (
		<div>
			<div className='input-group'>
				<input type='text' className='form-control' placeholder='Enter stock ticker' value={props.textValue}
				onChange={props.onChange}/>
				<span className='input-group-btn'>
					<button className='btn btn-primary' type='submit' 
					onClick={props.onClick}>
						Add
					</button>
				</span>
			</div>
		</div>
	)
}

SearchComponent.propTypes = {
	onChange: React.PropTypes.func.isRequired, 
	onClick: React.PropTypes.func.isRequired, 
	textValue: React.PropTypes.string.isRequired
}

export default SearchComponent;
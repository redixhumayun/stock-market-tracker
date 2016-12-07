import {Map} from 'immutable';

function setTickers(state, newState){
	return state.merge(state, newState);
}

export default function(state = Map(), action){
	switch(action.type){
		case 'SET_TICKERS':
			return setTickers(state, action.state);
		default: 
			return state;
	}
}
import Server from 'socket.io';

import {fetchData, addDataToState} from './actions/actions.js';

export function startServer(store){
	const io = new Server().attach(8090);

	store.subscribe(
		() => io.emit('state', store.getState())
	);

	io.on('connection', (socket) => {
		socket.emit('state', store.getState());
		socket.on('action', (action) => { 
			if(action.type === 'FETCH_AND_ADD_DATA' && action.tickerArray){
				helperToFetchAndAdd(store, action.state, action.tickerArray);
			}else{
				store.dispatch(action);
			}
		});
	});
}

function helperToFetchAndAdd(store, state, tickerArray){
	return store.dispatch(fetchData(state, tickerArray)).then((data) => {
		store.dispatch(addDataToState(state, data));
	})
}

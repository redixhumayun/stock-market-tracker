import React, { Component } from 'react';

import Chart from './containers/Chart.js';
import Search from './containers/Search.js';
import StockList from './containers/StockList.js';
import TimePeriodChanger from './containers/TimePeriodChanger.js';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className='row title'>
          <div className='col-sm-12 well text-center'>
            <h2>Stock Market Tracker</h2>
          </div>
        </div>
        <div className='row time-period-changer'>
          <div className='col-sm-6'>
            <TimePeriodChanger />
          </div>
        </div>
        <div className='row chart-area'>
          <div className='col-sm-12'>
            <Chart />
          </div>
        </div>
        <div className='row stock-list'>
          <div className='col-sm-12'>
            <StockList />
          </div>
        </div>
        <div className='row search-bar'>
          <div className='col-sm-12'>
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

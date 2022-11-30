import React, { Component } from 'react';
import Routes from './Include/Routes';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="dynamic">
          
        <Routes />
        </div>
      </div>
    );
  }
}

export default App;
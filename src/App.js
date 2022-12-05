import React, { Component } from 'react';
import Routes from './Include/Routes';
import './App.css'
import { BrowserRouter, Switch , Route, } from 'react-router-dom';
import {SignPage2} from './SignUp/SignPage';

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
import React, { Component } from 'react';
import Routes from './Include/Routes';
import './App.css'
import { BrowserRouter, Switch , Route, } from 'react-router-dom';
import { SignPage2 } from './SignUp/SignPage';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function App(){

    const getLibrary = (provider) => {
        const library = new Web3Provider(provider, 'any')
        library.pollingInterval = 15000
        return library
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div className='App'>
                <div className="dynamic">
                    <Routes />
                </div>
            </div>
        </Web3ReactProvider >
    );
}

export default App;
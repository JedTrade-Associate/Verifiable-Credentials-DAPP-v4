import { withRouter } from "react-router-dom";
import React, { Component, useState } from 'react'
import './Dashboard.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }
    render(){
        return(
            <div className="settingsDiv">
                <p className="mainHeader">Settings</p>

            </div>

        )
    }
}

export default withRouter(Settings);
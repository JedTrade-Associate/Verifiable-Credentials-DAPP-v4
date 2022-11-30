import { withRouter } from "react-router-dom";
import React, { Component, useState } from 'react'

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
            <h4>Settings</h4>
        )
    }
}

export default withRouter(Settings);
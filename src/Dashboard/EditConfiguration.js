import { withRouter } from "react-router-dom";
import React, { Component, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,  faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Countries from '../Include/DropdownValues/Countries';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, Calendar } from 'react-date-range';
import { Slider } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

class EditConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),

            value:this.props.location.state,

        }
    }

    async componentDidMount() {
      this.setState(this.state)
    }

    handleSelect = (ranges) => {
        this.setState({startDate: ranges.Selection.startDate, endDate: ranges.Selection.endDate})
    }
    sliderChange = () => {
        console.log('Calling Slider Change Func')
    }
    render(){

        const { state } = this.props.location;

        const selectionRange = {
            startDate: new Date(this.state.startDate),
            endDate: new Date(this.state.endDate),
            key: 'Selection'
          }

          const marks = [{
            value: 0,
            label: 'N.A.'
          },
          {
            value: 20,
            label: 1
          },
          {
            value: 40,
            label: 2
          },
          {
            value: 60,
            label: 3
          },
          {
            value:80,
            label: 4
          },
        ]

        return(
            <div className="configurationDiv">
                <p className="mainHeader2">Edit Configuration</p>
                <div className="EventFormBox">
                    <p className="EventFormHeader">Edit  Event</p>
                    
                    <form className="configurationForm">

                        <p className="inputHeaders">NAME: * </p>
                        <input type='text'className="nameInput"></input>
                        
                        <p className="inputHeaders">ORGANISATION: *</p>
                        <input type='text' className="nameInput"></input>
                        
                        <p className="inputHeaders">EMAIL: *</p>
                        <input type='email' className="nameInput"></input>
                        
                        <p className="inputHeaders">COMPANY WEBSITE: </p>
                        <input type='url' className="nameInput"></input>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '-253px'}}>COUNTRY: </p>
                        <select className="nameInput" style={{marginLeft: '370px'}}>
                            <Countries></Countries>
                        </select>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '0px'}}>CITY: </p>
                        <input type='text' className="nameInput" style={{marginLeft: '370px'}}></input>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '0px'}}>PURPOSE OF VERIFICATION: </p>
                        <select className="nameInput" id="purposeOfVerification" style={{marginLeft: '370px'}}>
                            <option value="IRL authentication">IRL authentication</option>
                            <option value="Token-Gate Events">Token-Gate Events</option>
                            <option value="Others">Others</option>
                        </select>

                        <span>
                        <p className="inputHeaders2">DATE OF EVENT: </p><br></br><br></br>
                            <DateRange
                                ranges={[selectionRange]}
                                onChange={this.handleSelect}
                                endDatePlaceholder="Continuous"
                                className="DateRangePicker"
                            />
                    </span>
                    </form>
                   

                    {/* <div>
                    <form className="secondConfigurationForm">
                  
                        
                    </form>
                    </div> */}

                    <div>
                        <form className="thirdConfigurationForm">
                        <p className="advancedConfigurationHeader">Advanced Configurations</p><FontAwesomeIcon icon={faChevronDown} style={{display: 'inline-block', marginLeft: '8px'}}></FontAwesomeIcon><br></br><br></br>                            <p className="inputHeaders3">RPC Endpoints: </p>
                            <select className="advancedInput">
                                <option value="EthereuemMainNet">Ethereum MainNet - Chain ID: 1</option>
                                <option value="BinanceMainNet">Binance MainNet - Chain ID: 97 </option>
                            </select>

                            <p className="inputHeaders3">Token Contract ID</p>
                            <input type='text 'className="advancedInput"></input>

                            <p className="inputHeaders3">Number of Tokens (NFTS) held by user</p>
                            <div className="sliderTokens">
                            <Slider
                            aria-label="Restricted values"
                            step={20}
                            valueLabelDisplay="auto"
                            onChange={this.sliderChange}
                            marks={marks}
                            />
                            </div>

                            <p className="inputHeaders3">Held NFTs for number of days.</p>
                            <div className="sliderTokens">
                            <Slider
                            aria-label="Restricted values"
                            step={20}
                            valueLabelDisplay="auto"
                            onChange={this.sliderChange}
                            marks={marks}
                            />
                            </div>
                            <button type="submit" className="submitBtnConfiguration">Save Event Changes</button>
                        </form>
                    </div>

                
                </div>

            </div>
        )
    }
}

export default withRouter(EditConfiguration);
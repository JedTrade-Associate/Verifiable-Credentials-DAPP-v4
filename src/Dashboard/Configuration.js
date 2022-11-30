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

class Configuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // startDate: new Date(),
            // endDate: new Date(),
            newName: '',
            newOrg: '',
            newEmail: '',
            newCompanyWeb: '',
            newCountry: '',
            newCity: '',
            newPurpose: '',
            newStartDate: new Date(),
            newEndDate: new Date(),
            newRpc: '',
            newTokenContractID: '',
            numberOfTokens: '',
            numberofDays:'',

            openAdvancedConfig: false
  
        }
    }

    async componentDidMount() {

    }

    handleSelect = (ranges) => {
        this.setState({newStartDate: ranges.Selection.startDate, newEndDate: ranges.Selection.endDate})
    }
    sliderChange = (event, value) => {
        this.setState({numberOfTokens: value})
    }
    sliderChange2 = (event, value) => {
      this.setState({numberofDays: value})
  }

    handleInputChanges = (e) => {
      if(e.target.id === 'name'){
        this.setState({newName: e.target.value})
      }
      else if(e.target.id === 'organisation'){
        this.setState({newOrg: e.target.value})
      }
      else if(e.target.id === 'email'){
        this.setState({newEmail: e.target.value})
      }
      else if(e.target.id === 'companyWebsite'){
        this.setState({newCompanyWeb: e.target.value})
      }

      else if(e.target.id === 'country'){
        this.setState({newCountry: e.target.value})
      }
      else if(e.target.id === 'city'){
        this.setState({newCity: e.target.value})
      }
      else if(e.target.id === 'purposeOfVerification'){
        if(e.target.value === 'Token-Gate Events'){
          this.setState({openAdvancedConfig: true})
        }
        else{
          this.setState({openAdvancedConfig: false})
        }
        this.setState({newPurpose: e.target.value})
      }
      else if(e.target.id === 'RPC'){
        this.setState({newRpc: e.target.value})
      }
      else if(e.target.id === 'tokenID'){
        this.setState({newTokenContractID: e.target.value})
      }
    }
    submitNewEvent = () => { 
     
    }


    render(){

        const selectionRange = {
            startDate: new Date(this.state.newStartDate),
            endDate: new Date(this.state.newEndDate),
            key: 'Selection'
          }

          //hardcoded for now
          const marks = [{
            value: 0,
            label: 'N.A.'
          },
          {
            value: 1,
            label: 1
          },
          {
            value: 2,
            label: 2
          },
          {
            value: 3,
            label: 3
          },
          {
            value:4,
            label: 4
          },
        ]

        return(
            <div className="configurationDiv">
                <p className="mainHeader">Configuration</p>
                <div className="EventFormBox">
                    <p className="EventFormHeader">New Event</p>
                    
                    <form className="configurationForm">

                        <p className="inputHeaders">NAME: * </p>
                        <input type='text'className="nameInput" onChange={this.handleInputChanges} id='name'></input>
                        
                        <p className="inputHeaders">ORGANISATION: *</p>
                        <input type='text' className="nameInput" id='organisation' onChange={this.handleInputChanges}></input>
                        
                        <p className="inputHeaders">EMAIL: *</p>
                        <input type='email' className="nameInput" id='email' onChange={this.handleInputChanges}></input>
                        
                        <p className="inputHeaders">COMPANY WEBSITE: </p>
                        <input type='url' className="nameInput" id='companyWebsite' onChange={this.handleInputChanges}></input>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '-253px'}}>COUNTRY: </p>
                        <select className="nameInput" id='country' style={{marginLeft: '370px'}} onChange={this.handleInputChanges}>
                            <Countries></Countries>
                        </select>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '0px'}}>CITY: </p>
                        <input type='text' className="nameInput" style={{marginLeft: '370px'}} id='city' onChange={this.handleInputChanges}></input>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '0px'}}>PURPOSE OF VERIFICATION: </p>
                        <select className="nameInput" id="purposeOfVerification" style={{marginLeft: '370px'}} onChange={this.handleInputChanges} >
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
                    {this.state.openAdvancedConfig === true &&
                        <form className="thirdConfigurationForm">
                        <p className="advancedConfigurationHeader">Advanced Configurations</p><FontAwesomeIcon icon={faChevronDown} style={{display: 'inline-block', marginLeft: '8px'}}></FontAwesomeIcon><br></br><br></br><p className="inputHeaders3">RPC ENDPOINTS: </p>
                            <select className="advancedInput" id="RPC" onChange={this.handleInputChanges}>
                                <option value="EthereuemMainNet">Ethereum MainNet - Chain ID: 1</option>
                                <option value="BinanceMainNet">Binance MainNet - Chain ID: 97 </option>
                            </select><br></br>

                            <p className="inputHeaders3">TOKEN CONTRACT ID</p>
                            <input type='text 'className="advancedInput" id="tokenID" onChange={this.handleInputChanges}></input>
                            <br></br>
                            <p className="inputHeaders3">Number of Tokens (NFTS) held by user</p>
                            <div className="sliderTokens">
                            <Slider
                            aria-label="Restricted values"
                            step={null}
                            valueLabelDisplay="auto"
                            onChange={this.sliderChange}
                            marks={marks}
                            max = {5}
                            min = {0}
                            />
                            {/* <input type='text' className='sliderInput'></input> */}
                            </div>

                            <p className="inputHeaders3">Held NFTs for number of days.</p>
                            <div className="sliderTokens">
                            <Slider
                            aria-label="Restricted values"
                            step={null}
                            valueLabelDisplay="auto"
                            onChange={this.sliderChange2}
                            marks={marks}
                            max = {5}
                            min = {0}

                            />
                            </div>
                          
                        </form>
                        }
                        <button type="submit" className="submitBtnConfiguration" onClick={this.submitNewEvent}>Submit Event Conditions</button>
                    </div>

                
                </div>

            </div>
        )
    }
}

export default withRouter(Configuration);
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

class EditConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // startDate: new Date(),
            // endDate: new Date(),

            value:this.props.location.state,

            editName: '',
            editOrg: '',
            editEmail: '',
            editCompanyWeb: '',
            editCountry: '',
            editCity: '',
            editPurpose: '',
            editStartDate: new Date(),
            editEndDate: new Date(),
            editRpc: '',
            editTokenContractID: '',
            numberOfTokens: '',
            numberofDays:'',

            openAdvancedConfig: false,
            disableSlideInput: true,
            disableSlideInput2: true

        }
    }

    async componentDidMount() {
      this.setState(this.state)
    }

    handleSelect = (ranges) => {
        this.setState({editStartDate: ranges.Selection.startDate, editEndDate: ranges.Selection.endDate})
    }
    sliderChange = (event, value) => {
      if(value === 5){
        var inputSlider = document.getElementById('numberofTokensInput')
        this.setState({disableSlideInput: false})
        inputSlider.focus();
       }
       else{
        this.setState({numberOfTokens: value, disableSlideInput: true})
       }
    }
    sliderChange2 = (event, value) =>{
      if(value === 5){
        var inputSlider = document.getElementById('numberofTokensInput2')
        this.setState({disableSlideInput2: false});
        inputSlider.focus();
       }
       else{
        this.setState({numberofDays: value, disableSlideInput2: true});
       }
    }

    handleInputChanges = (e) => {
      const numbers = /^\d+$/;
      if(e.target.id === 'name'){
        this.setState({editName: e.target.value})
      }
      else if(e.target.id === 'organisation'){
        this.setState({editOrg: e.target.value})
      }
      else if(e.target.id === 'email'){
        this.setState({editEmail: e.target.value})
      }
      else if(e.target.id === 'companyWebsite'){
        this.setState({editCompanyWeb: e.target.value})
      }

      else if(e.target.id === 'country'){
        this.setState({editCountry: e.target.value})
      }
      else if(e.target.id === 'city'){
        this.setState({editCity: e.target.value})
      }
      else if(e.target.id === 'purposeOfVerification'){
        if(e.target.value === 'Token-Gate Events'){
          this.setState({openAdvancedConfig: true})
        }
        else{
          this.setState({openAdvancedConfig: false})
        }
        this.setState({editPurpose: e.target.value})
      }
      else if(e.target.id === 'RPC'){
        this.setState({editRpc: e.target.value})
      }
      else if(e.target.id === 'tokenID'){
        this.setState({editTokenContractID: e.target.value})
      }
      else if(e.target.id === 'numberofTokensInput'){
        
        var inputSlider = document.getElementById('numberofTokensInput')

        if(!e.target.value.toString().match(numbers)) {
          inputSlider.style.border = '2px solid rgb(255, 25, 25)'
        }
        else if(e.target.value.toString().match(numbers)){
          inputSlider.style.border = '2px solid rgb(59, 130, 246)'
        }

        this.setState({numberOfTokens: e.target.value})
      }
      else if(e.target.id === 'numberofTokensInput2'){

        var inputSlider = document.getElementById('numberofTokensInput2')

        if(!e.target.value.toString().match(numbers)) {
          inputSlider.style.border = '2px solid rgb(255, 25, 25)'
        }
        else if(e.target.value.toString().match(numbers)){
          inputSlider.style.border = '2px solid rgb(59, 130, 246)'
        }
        
        this.setState({numberofDays: e.target.value})
      }
    }
    submitEditEvent = () => { 
     
    }
    render(){

        const { state } = this.props.location;

        const selectionRange = {
            startDate: new Date(this.state.editStartDate),
            endDate: new Date(this.state.editEndDate),
            key: 'Selection'
          }

          //hardcoded for now
          const marks = [{
            value: 0,
            label: 'N.A.'
          },
          {
            value:1,
            label: 1
          },
          {
            value:2,
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
          {
            value:5
          },
        ]

        return(
            <div className="configurationDiv">
                <p className="mainHeader2">Edit Configuration</p>
                <div className="EventFormBox">
                    <p className="EventFormHeader">Edit  Event</p>
                    
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

                    <div>
                      {this.state.openAdvancedConfig === true &&
                        <form className="thirdConfigurationForm">
                        <p className="advancedConfigurationHeader">Advanced Configurations</p><FontAwesomeIcon icon={faChevronDown} style={{display: 'inline-block', marginLeft: '8px'}}></FontAwesomeIcon><br></br><br></br>                            <p className="inputHeaders3">RPC Endpoints: </p>
                        <select className="advancedInput" id="RPC" onChange={this.handleInputChanges}>
                                <option value="EthereuemMainNet">Ethereum MainNet - Chain ID: 1</option>
                                <option value="BinanceMainNet">Binance MainNet - Chain ID: 97 </option>
                            </select><br></br>

                            <p className="inputHeaders3">Token Contract ID</p>
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
                            </div>
                            <input type='text' className='sliderInput' id='numberofTokensInput' onChange={this.handleInputChanges} disabled={this.state.disableSlideInput}></input>

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
                            <input type='text' className='sliderInput' id='numberofTokensInput2' onChange={this.handleInputChanges} disabled={this.state.disableSlideInput2}></input>
                        
                        </form>
                      }
                        <button type="submit" className="editEventChanges" onClick={this.submitEditEvent}>Save Event Changes</button>
                    </div>

                
                </div>

            </div>
        )
    }
}

export default withRouter(EditConfiguration);
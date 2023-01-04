import { withRouter, useHistory } from "react-router-dom";
import React, { Component, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,  faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Countries from '../Include/DropdownValues/Countries';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, Calendar } from 'react-date-range';
import { Slider } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";

const axios = require('axios');

export const Configuration2 = () => {
  const [nameInput, setNameInput] = useState('');
  const [orgInput, setOrgInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [companyWebInput, setCompanyWebInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [purposeInput, setPurposeInput] = useState('');
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());
  const [rpcInput, setRpcInput] = useState('');
  const [tokenIDInput, setTokenIDInput] = useState('');
  const [numberOfTokensInput, setNumberOfTokensInput] = useState('');
  //const [numberOfDaysInput, setNumberOfDaysInput] = useState('');
  const history = useHistory();

  // const [inputList, setInputList] = useState([{name: '', org: '', email: '', companyweb: '', country: '', city: '', purpose: '',
  // startDate: new Date(), endDate: new Date(), rpc: '', tokenId: '', numberofTokens: '', numberofdays: ''}]);
  const [openAdvancedConfig, setAdvancedConfig] = useState(false)
  const [disableSliderInput1, setDisableSliderInput1] = useState(true)
  const [disableSliderInput2, setDisableSliderInput2] = useState(true)
  
  const selectionRange = {
    startDate: new Date(startDateInput),
    endDate: new Date(endDateInput),
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
  {
    value:5
  },
]

  const handleSelect = (ranges) => {
    setStartDateInput(ranges.Selection.startDate), setEndDateInput(ranges.Selection.endDate)
  }

  const sliderChange = (event, value) => {
    if(value === 5){
      var inputSlider = document.getElementById('numberofTokensInput')
      setDisableSliderInput1(false)
      inputSlider.focus();
     }
     else{
      setNumberOfTokensInput(value), setDisableSliderInput1(true)
     }
  }
  const sliderChange2 = (event, value) => {
    if(value === 5){
      var inputSlider = document.getElementById('numberofTokensInput2')
      setDisableSliderInput2(false)
      inputSlider.focus();
     }
     else{
      setNumberOfDaysInput(value), setDisableSliderInput2(true)
     }
   }
   const handleInputChanges = (e) => {
   submitNewEvent(e.target.value, e.target.id)
   }

  
  const submitNewEvent = (value, ID) => { 
    const numbers = /^\d+$/;

     if(ID === 'name'){
         if(value !== ''){
          setNameInput(value)
         }
     }

     else if(ID === 'organisation'){
        if(value !== ''){
          setOrgInput(value)
        }
     }
     else if (ID === 'email'){
        if(value !== ''){
          setEmailInput(value)
        }
     }
     else if (ID === 'companyWebsite'){
      if(value !== ''){
        setCompanyWebInput(value)
      }
     }
     else if (ID === 'country'){
      if(value !== ''){
        setCountryInput(value)
      }
     }
     else if (ID === 'city'){
      if(value !== ''){
        setCityInput(value)
      }
     }
     else if (ID === 'purposeOfVerification'){
      
         if(value === 'Token-Gate Events'){
        setAdvancedConfig(true)
         }
         else{
        setAdvancedConfig(false)
         }

         if(value !== ''){
        setPurposeInput(value)
         }
      
      }
     else if (ID === 'RPC'){
      if(value !== ''){
        setRpcInput(value)
      }
     }
     else if(ID === 'tokenID'){
      setTokenIDInput(value)
    }
    else if(ID === 'numberofTokensInput'){

      var inputSlider = document.getElementById('numberofTokensInput')
  
      if(!value.toString().match(numbers)) {
        inputSlider.style.border = '2px solid rgb(255, 25, 25)'
      }
      else if(value.toString().match(numbers)){
        inputSlider.style.border = '2px solid rgb(59, 130, 246)'
        setNumberOfTokensInput(value)
      }

    }
    else if(ID === 'numberofTokensInput2'){

      var inputSlider = document.getElementById('numberofTokensInput2')
  
      if(!value.toString().match(numbers)) {
        inputSlider.style.border = '2px solid rgb(255, 25, 25)'
      }
      else if(value.toString().match(numbers)){
        inputSlider.style.border = '2px solid rgb(59, 130, 246)'
        setNumberOfDaysInput(value)
      }

    }
    }

    const saveConditions = async () => {

        var identifierCode = Math.floor(100000 + Math.random() * 900000);
        var startdate = startDateInput.toLocaleDateString("en-UK");
        var enddate = endDateInput.toLocaleDateString("en-UK");

        var conditions = {
            name: `${nameInput}`,
            org: `${orgInput}`,
            email: `${emailInput}`,
            companyWeb: `${companyWebInput}`,
            purpose: `${purposeInput}`,
            startDate: `${startdate}`,
            endDate: `${enddate}`,
            rpc: `${rpcInput}`,
            tokenID: `${tokenIDInput}`,
            numberofTokens: `${numberOfTokensInput}`,
            //numberofDays: `${numberOfDaysInput}`,
            identifier: `${identifierCode}`,
            attendees: 0,
        }

        axios({
            method: "POST",
            url: "http://localhost:3002/api/v1/conditions",
            data: conditions
        })
        history.push('/Dashboard')
        console.log(conditions)
    }

  return(
    <div className="configurationDiv">
                <p className="mainHeader">Configuration</p>
                <div className="EventFormBox">
                    <p className="EventFormHeader">New Event</p>
                    
                    <form className="configurationForm">

                        <p className="inputHeaders">EVENT NAME: * </p>
                        <input type='text'className="nameInput" onChange={handleInputChanges} id='name'></input>
                        
                        <p className="inputHeaders">ORGANISATION: *</p>
                        <input type='text' className="nameInput" id='organisation' onChange={handleInputChanges}></input>
                        
                        <p className="inputHeaders">EMAIL: *</p>
                        <input type='email' className="nameInput" id='email' onChange={handleInputChanges}></input>
                        
                        <p className="inputHeaders">COMPANY WEBSITE: </p>
                        <input type='url' className="nameInput" id='companyWebsite' onChange={handleInputChanges}></input>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '-253px'}}>COUNTRY: </p>
                        <select className="nameInput" id='country' style={{marginLeft: '370px'}} onChange={handleInputChanges}>
                            <Countries></Countries>
                        </select>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '0px'}}>CITY: </p>
                        <input type='text' className="nameInput" style={{marginLeft: '370px'}} id='city' onChange={handleInputChanges}></input>

                        <p className="inputHeaders" style={{marginLeft: '370px', marginTop: '0px'}}>PURPOSE OF VERIFICATION: </p>
                        <select className="nameInput" id="purposeOfVerification" style={{marginLeft: '370px'}} onChange={handleInputChanges} >
                            <option value="IRL authentication">In Real Life authentication</option>
                            <option value="Token-Gate Events">Token-Gate Events</option>
                            <option value="Others">Others</option>
                        </select>

                        <span>
                        <p className="inputHeaders2">DATE OF EVENT: </p><br></br><br></br>
                            <DateRange
                                ranges={[selectionRange]}
                                onChange={handleSelect}
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
                    {openAdvancedConfig === true &&
                        <form className="thirdConfigurationForm">
                        <p className="advancedConfigurationHeader">Advanced Configurations</p><FontAwesomeIcon icon={faChevronDown} style={{display: 'inline-block', marginLeft: '8px'}}></FontAwesomeIcon><br></br><br></br><p className="inputHeaders3">RPC ENDPOINTS: </p>
                            <select className="advancedInput" id="RPC" onChange={handleInputChanges}>
                                <option value="EthereuemMainNet">Ethereum MainNet - Chain ID: 1</option>
                                <option value="GoerliTestNet">Goerli TestNet - Chain ID: 5</option>
                                <option value="BinanceMainNet">Binance MainNet - Chain ID: 97 </option>
                            </select><br></br>

                            <p className="inputHeaders3">TOKEN CONTRACT ADDRESS</p>
                            <input type='text 'className="advancedInput" id="tokenID" onChange={handleInputChanges}></input>
                            <br></br>
                            <p className="inputHeaders3">Number of Tokens (NFTS) held by user (&#8805;)</p>
                            <div className="sliderTokens">
                            <Slider
                            aria-label="Restricted values"
                            step={null}
                            valueLabelDisplay="auto"
                            onChange={sliderChange}
                            marks={marks}
                            max = {5}
                            min = {0}
                            />
                            </div>

                            <input type='text' className='sliderInput' id='numberofTokensInput' onChange={handleInputChanges} disabled={disableSliderInput1}></input>
                            {/*
                            <p className="inputHeaders3">Held NFTs for number of days. (&#8805;)</p>
                            <div className="sliderTokens">
                            <Slider
                            aria-label="Restricted values"
                            step={null}
                            valueLabelDisplay="auto"
                            onChange={sliderChange2}
                            marks={marks}
                            max = {5}
                            min = {0}

                            />
                            </div>
                            <input type='text' className='sliderInput' id='numberofTokensInput2' onChange={handleInputChanges} disabled={disableSliderInput2}></input>
                          */}
                        </form>
                        }
                        <button type="submit" className="submitBtnConfiguration" onClick={saveConditions}>Submit Event Conditions</button>
                    </div>

                
                </div>

            </div>
  )

}

export default withRouter(Configuration2);
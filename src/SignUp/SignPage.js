import React, { Component, useState } from 'react'
import { withRouter, BrowserRouter, Link, useHistory} from 'react-router-dom';
import "./SignPage.css";
import swal from 'sweetalert'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { useRef, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { concat } from 'ethers/lib/utils'
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

export const SignPage2 = () => {
    const[isLogin, setIsLogin] = useState(true);
    const [Ptext, setPagetext] = useState("Start Generating Your Verifiable Credentials and Proof Ownership");
    const [isVerified, setIsVerified] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const history = useHistory();

    const onGenClick = () => {
        setIsLogin(true)
        setPagetext("Start Generating Your Verifiable Credentials and Proof Ownership")
    }

    const onVClick = async () => {
        setIsLogin(false)
        setPagetext("Set Your Event Conditions and Start Verifying Attendees")
    }
    const onVerifyClick = () => {
        setIsLogin(true), setIsVerified(true), setPagetext('Start Generating Your Verifiable Credentials and Proof Ownership')
   }
    

    const handleInputField = async (e) => {
        // console.log('target value', e.target.value)
        // if(e.target.id === 'emailInput' ){
        //     onVerificationClick(e.target.value);
        // }
        // else if(e.target.id === 'passwordInput'){
        //     onVerificationClick(e.target.value);
        // }
        
    }

    const onVerificationClick = async (e) => {
        history.push('/Dashboard')
        //Validation for empty fields
        // if(e === '' || e  === '' ){
        //     setErrorText('Empty Login Details');

        // }
        // //Validation for wrong input temporary
        // else if(e === 'wrong' || e === 'wrong'){
        //     setErrorText('Incorrect Login Details')
        // }
        // else if(e === 'Ruixuan' || e === 'ruixuan'){
        //     history.push('/Dashboard')
        // }
        // else{
        //     console.log(e, 'lol')
        //     setEmailInput(e);
        //     setPasswordInput(e);
            
            // return(
            //     <Link to={'/Dashboard'}>Dashbaord </Link>
            // )
            
    }
    
    const VCGen = () => {
        return(
            <div className="bg-white rounded-2xl shadow-2xl py-8 md:w-1/2 items-center transition duration-500 ease-out" id='generateCredBox'>
                        <h3 className='text-xl font-semibold text-blue-400 pt-4'>Generate Verifiable Credentials</h3><br></br>
                        {/* Inputs */}
                        <div className='flex flex-col items-center justify-center'>
                            <div class="box-content p-4 border-4" id='qrCodeBox'></div>
                            <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
                                SIGN
                      </button>
                        </div>
                        
                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                        <p className='text-blue-400 mt-4 text-sm'>Event Organiser?</p>
                        <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={onVClick}>Navigate To Verifier Page</p>
            </div>
        )
    }

    const VerifierCond = () => {
        return(
            <div className="bg-[#64748b] text-white rounded-2xl shadow-2xl py-8  flex flex-col w-full  md:w-1/2 items-center max-w-4xl transition duration-500 ease-in">
                        <h3 className='text-xl font-semibold text-white pt-2'>Enter Login Credentials</h3>
                        <br></br>
                        {/* Inputs */}
                        <div className='flex flex-col items-center justify-center mt-2'>
                            {errorText === 'Empty Login Details' &&
                               <p style={{color: '#ff483b'}}>Please fill up all fields</p>
                            }
                            {errorText === 'Incorrect Login Details' &&
                               <p style={{color: '#ff483b'}}>There are incorrect field inputs</p>
                            }
                            
                            {errorText === '' && 
                            <>
                              <input type='email' className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Email' id='emailInput' onChange={handleInputField}></input>
                              <input type="password" className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Password' id='passwordInput' onChange={handleInputField}></input>
                              </>
                            }
                            {errorText !== '' && 
                            <>
                              <input type='email' className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[2px] border-red-400 m-1 focus:shadow-md focus:border-red focus:outline-none focus:ring-0' placeholder='Email' id='emailInput' onChange={handleInputField}></input>
                              <input type="password" className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[2px] border-red-400 m-1 focus:shadow-md focus:border-red focus:outline-none focus:ring-0' placeholder='Password' id='passwordInput' onChange={handleInputField}></input>
                              </>
                            }
                            <p className='forgetPasswordTxt'>Forget Password?</p>
                            
                           <br></br>
                            <span>
                            <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in' id='verifyBtn' onClick={onVerificationClick}>
                                LOGIN
                            </button>
                            </span>
                        </div>
                        <br></br>
                        <div className="inline-block border-[1px] justify-center w-20 border-white border-solid" id='hrOfGenerateVC'></div>
                        <p className='text-white mt-4 text-sm'>Generate VCs?</p>
                        <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={onVerifyClick}>Sign and Generate</p>
                    </div>
        )
    }

    return(
        <>
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2" style={{backgroundColor: '#1a1d43'}} id='signPageContainer'>
            <main className="flex items-center w-full px-2 md:px-20">
                <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                    <p className='AppName'>VC DAPP</p>
                    <p className= '' id="subText">{Ptext}</p>
                </div>
                {
                    isLogin ? (
                        <VCGen/>
                    ) : (
                        <VerifierCond/>
                        )
                }
                </main>
            </div>
        </>
    )

}


export default withRouter(SignPage2);

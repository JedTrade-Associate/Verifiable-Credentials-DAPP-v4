import React, { Component, useState } from 'react'
import { withRouter, BrowserRouter, Link, useHistory} from 'react-router-dom';
import "./SignPage.css";
import swal from 'sweetalert'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { useRef, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { concat } from 'ethers/lib/utils'
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');
import { Dots, MinimalSpinner, TrinitySpinner, Waves, ProgressBar, Spinner } from 'loading-animations-react';

export const SignPage2 = () => {
    const getLibrary = (provider) => {
        const library = new Web3Provider(provider, 'any')
        library.pollingInterval = 15000
        return library
    }

    const[isLogin, setIsLogin] = useState(true);
    const [Ptext, setPagetext] = useState("Start Generating Your Verifiable Credentials and Proof Ownership");
    const [isVerified, setIsVerified] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    // Web 3 login
    const { activate, deactivate, library, account, chainId, message } = useWeb3React()
    const [connected, setConnect] = useState("connect");
    //const { infuraKey } = "c4761ef89a064e6fb5e971029f651135";

    // MetaMask
    const injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42],
    })

    // QR generator
    const [url, setUrl] = useState("");
    const [duplicate, setDuplicate] = useState("");
    const qrRef = useRef();

    // Connect Wallet
    const onConnectClicked = async () => {
        try {
            if (connected == "connect") {
                await activate(injected)
                setConnect("Disconnect")
                setDuplicate("")
            }
            else if (connected == "Disconnect") {
                deactivate()
                setConnect("connect")
                setUrl("")
            }
        } catch (ex) {
            console.log(ex)
        }
        onCheckwalletApi();
    }

    // Check if wallet has already been registered
    const [exist, setexist] = useState("");
    const onCheckwalletApi = async () => {
        axios({
            method: "GET",
            url: `http://localhost:3002/api/v1/users/${account}`,
        }).then(
            res => {
                if (res.status == 200) {
                    setexist("exist")
                }
                else {
                    setexist("not")
                }
            }
        )
    }

    // Sign with MetaMask
    const onMetamaskSignClicked = async () => {
        setUrl("")
        setexist("")
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        const message = (
            `note:
        Signing a message is required to 
        prove that you are in control of 
        the wallet you are enrolling. 
        Signing is a safe,gas-less 
        transaction that does not in 
        any way give permission 
        to perform any transactions on 
        your behalf.

Issued at:
        ${dateTime}

Account: ${account}
        `)

        const flatSignature = await library.getSigner().signMessage(message)

        const signerAddr = await ethers.utils.verifyMessage(message, flatSignature)
        if (signerAddr != account) {
            console.log(signerAddr)
            console.log("not verified")
        }
        else {
            console.log("Wallet Verified -- Processing Document")
            setDuplicate("connecting")
            APIProcess();
        }
    }

    const APIProcess = async () => {
        axios({
            method: "POST",
            url: "http://localhost:3002/api/v1/users",
            data: {
                wallet: `${account}`,
                deviceID: "",
                vc: "",
            }
        }).then(res => {
            createVC();
        }).catch(function(error) {
            if ( error.response.status == 500) {
                console.log(error.response.data);
                console.log("Duplicated VC");
                setDuplicate("500")
            }
        });
    }

    const createVC = async () => {
        axios({
            method: "POST",
            url: "http://localhost:3002/api/v1/issuance/create",
            data: {
                wallet: `${account}`,
            }
        }).then(res => {
            var JSONstring = JSON.stringify(res.data);
            var VC = window.btoa(JSONstring);
            console.log(VC)
            storeVCAPI(VC);
        })
    }

    const storeVCAPI = async (vc) => {
        axios({
            method: "POST",
            url: "http://localhost:3002/api/v1/users/VC",
            data: {
                wallet: `${account}`,
                deviceID: "",
                vc: `${vc}`,
            }
        })

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        var encodedStringBtoA = window.btoa(account + dateTime);
        setUrl(encodedStringBtoA);
    }


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

    const qrcode = (
        <div className="flex flex-row space-x-3">
            <QRCodeCanvas
                id="qrCode"
                value={url}
                size={270}
                bgColor={"white"}
                level={"H"}
            />
        </div>
    );
    

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
        return (
            <>
                <div className="bg-white rounded-2xl shadow-2xl py-8 md:w-1/2 items-center transition duration-500 ease-out" id='generateCredBox'>
                    <div className="flex flex-col items-center">
                        <h3 className='text-xl font-semibold text-blue-400 pt-4'>Generate Verifiable Credentials</h3><br></br>
                        {/* Inputs */}
                        <div className='flex flex-col items-center justify-center'>
                            {(url != "") ? (
                                <div class="box-content p-4 border-4 flex flex-col items-center justify-center" id='qrCodeBox'><div ref={qrRef}>{qrcode}</div></div>

                            ) : (duplicate == "connecting") ?
                                    (
                                        <div class="box-content p-4 flex flex-col items-center justify-center" id='qrCodeBox'>
                                            <div className="flex flex-col items-center pt-5 space-y-4">
                                                <Waves backgroundColor="#fff" text="Generating verifiable credentials..." waveColor="#afeeee" className="w-50 text-sky-600 font-bold" />
                                            </div>
                                        </div>
                                    ) : (duplicate == "500") ?
                                        (
                                            <div class="box-content p-4 flex flex-col items-center justify-center" id='qrCodeBox'>
                                                <div className="flex flex-col items-center pt-5 space-y-4">
                                                    <img width={150} height={150} src={require('../Assets/76699-error.gif')} alt="VC has been Duplicated" />
                                                    <h4 className='text-lg text-gray-400 pt-2'>Wallet has already been registered to a device</h4><br></br>
                                                </div>
                                            </div>
                                        )
                                    : (
                                            <div class="box-content p-4 flex flex-col items-center justify-center" id='qrCodeBox'>
                                                <div className="flex flex-col items-center pt-5 space-y-4">
                                                    <Waves backgroundColor="#fff" text="Connect Wallet and Sign to Generate your VC" waveColor="#afeeee" className="w-50 text-sky-600 font-bold" />
                                                </div>
                                            </div>
                                        )
                            }
                            <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-6 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                                onClick={onMetamaskSignClicked}
                            >
                                SIGN
                      </button>
                        </div>
                        
                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                        <p className='text-blue-400 mt-4 text-sm'>Event Organiser?</p>
                        <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={onVClick}>Navigate To Verifier Page</p>
                    </div>
                </div>
            </>
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
                            <p className='forgetPasswordTxt'>Not a verifier?</p>
                            
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
    const SignPage = () => {
        return (
            <>
            <div class="absolute top-10 right-20 h-18 w-19 ...">
                <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-10 py-3 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    onClick={onConnectClicked}
                >
                        {account || 'Connect Wallet'}
                      </button>
            </div>
            <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2" style={{ backgroundColor: '#1a1d43' }} id='signPageContainer'>
                <main className="flex items-center w-full px-2 md:px-20">
                    <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                        <p className='AppName'>WalletProof</p>
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
            )
            </>
        )
    }

    const Registered = () => {
        return (
            <>
                <div class="absolute top-10 right-20 h-18 w-19 ...">
                    <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-10 py-3 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    >
                        {account || 'Disconnect Wallet'}
                    </button>
                </div>
                <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2" style={{ backgroundColor: '#1a1d43' }} id='signPageContainer'>
                    <main className="flex items-center w-full px-2 md:px-20">
                        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                            <p className='RegistedPage'>Welcome to WalletProof</p>
                        </div>
                        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-400">Expiration Date</h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">Date here</p>
                        </a>
                        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-white dark:bg-white dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-400">Re-issue wallet</h5>
                                <p class="font-normal text-gray-700 dark:text-gray-400">Lost or changed device</p>
                        </a>
                        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-white dark:bg-white dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-400">Revoke Verifiable Credentials</h5>
                                <p class="font-normal text-gray-700 dark:text-gray-400">Lost access to the account, or not using your walletproof anymore?</p>
                            </a>
                        </div>
                    </main>
                </div>
            </>
        )
    }

    return(
        <>
            {
                exist == "exist" ? (
                    <Registered />
                ) : (
                        <SignPage />
                    )
            }
        </>
    )

}


export default withRouter(SignPage2);

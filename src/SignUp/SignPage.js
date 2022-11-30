import React, { Component, useState } from 'react'
import { withRouter, BrowserRouter } from 'react-router-dom';
import "./SignPage.css";
import swal from 'sweetalert'

class SignPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Login States
            isLogin: true,
            setPageText: 'Start Generating Your Verifiable Credentials and Proof Ownership',
            setIsVerify: false,
            errorInput: '',
            emailInput: '',
            passwordInput: '', 
        }
    }
    
    async componentDidMount(){
       
    }
    
    onGenClick = () => {
        this.setState({isLogin: true, setPageText: "Start Generating Your Verifiable Credentials and Proof Ownership"})
    }
    onVClick = async () => {
        this.setState({isLogin: false, setPageText: "Set Your Event Conditions and Start Verifying Attendees"})
    }
    onVerifyClick = () => {
        this.setState({isLogin: true, setIsVerify: true, setPageText: "Start Generating Your Verifiable Credentials and Proof Ownership" });
    }
    handleVerificationCodeChange = async (e) => {
        const numbers = /^\d+$/;

        let arrOfEach = [0,0,0,0,0,0];
        let combinedCode;

        console.log(e.target.id, 'target id')
        if(e.target.value.length !== 0 && e.target.value.length < 2 && e.target.value.toString().match(numbers)){
            var inputChanged = e.target.id.slice(-1)
            arrOfEach[inputChanged] = e.target.value;
            this.setState({errorInput: ''})
        }
        
        if (e.target.value.length !== 0){
            arrOfEach.push(e.target.value);
        }
        if(arrOfEach.length > 6){
            console.log('There is an error in retrieving the right verification code.')
        }
        else if (arrOfEach.length === 6){
            combinedCode = arrOfEach.join('')
            console.log(combinedCode, 'Combined code')
            
        }
        
        
    }
    handleInputField = async (e) => {
        console.log('target value', e.target.value)
        if(e.target.id === 'emailInput' ){
            this.setState({emailInput: e.target.value})
        }
        else if(e.target.id === 'passwordInput'){
            this.setState({passwordInput: e.target.value})
        }
        

    }

    onVerificationClick = () => {
        //Validation for empty fields
        if(this.state.emailInput === '' || this.state.passwordInput === '' ){
            this.setState({errorInput: 'Empty Login Details'})

        }
        //Validation for wrong input temporary
        else if(this.state.emailInput === 'wrong' || this.state.passwordInput === 'wrong'){
            this.setState({errorInput: 'Incorrect Login Details'})
        }
        else{
            this.props.history.push('/Dashboard');
            this.props.history.go('/Dashboard');
        }
    }

    render (){
    return (
        <>
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2" style={{backgroundColor: '#1a1d43'}} id='signPageContainer'>
            <main className="flex items-center w-full px-2 md:px-20">
                <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                    <p className='AppName'>VC DAPP</p>
                    <p className= '' id="subText">{this.state.setPageText}</p>
                </div>
                {
                    this.state.isLogin ? (
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
                        <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={this.onVClick}>Navigate To Verifier Page</p>
                      </div>
                    ) : (
                        <div className="bg-[#64748b] text-white rounded-2xl shadow-2xl py-8  flex flex-col w-full  md:w-1/2 items-center max-w-4xl transition duration-500 ease-in">
                        <h3 className='text-xl font-semibold text-white pt-2'>Enter Login Credentials</h3>
                        <br></br>
                        {/* Inputs */}
                        <div className='flex flex-col items-center justify-center mt-2'>
                            {this.state.errorInput === 'Empty Login Details' &&
                               <p style={{color: '#ff483b'}}>Please fill up all fields</p>
                            }
                            {this.state.errorInput === 'Incorrect Login Details' &&
                               <p style={{color: '#ff483b'}}>There are incorrect field inputs</p>
                            }
                            
                            {this.state.errorInput === '' && 
                            <>
                              <input type='email' className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Email' id='emailInput' onChange={this.handleInputField}></input>
                              <input type="password" className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Password' id='passwordInput' onChange={this.handleInputField}></input>
                              </>
                            }
                            {this.state.errorInput !== '' && 
                            <>
                              <input type='email' className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[2px] border-red-400 m-1 focus:shadow-md focus:border-red focus:outline-none focus:ring-0' placeholder='Email' id='emailInput' onChange={this.handleInputField}></input>
                              <input type="password" className='rounded-xl px-2 py-1 w-4/5 md:w-full border-[2px] border-red-400 m-1 focus:shadow-md focus:border-red focus:outline-none focus:ring-0' placeholder='Password' id='passwordInput' onChange={this.handleInputField}></input>
                              </>
                            }
                            <p className='forgetPasswordTxt'>Forget Password?</p>
                            
                           <br></br>
                            <span>
                            <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in' id='verifyBtn' onClick={this.onVerificationClick}>
                                LOGIN
                            </button>
                            </span>
                        </div>
                        <br></br>
                        <div className="inline-block border-[1px] justify-center w-20 border-white border-solid" id='hrOfGenerateVC'></div>
                        <p className='text-white mt-4 text-sm'>Generate VCs?</p>
                        <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={this.onVerifyClick}>Sign and Generate</p>
                    </div>
                        )
                }
                </main>
            </div>
        </>
    )
}
}
// 

export default withRouter(SignPage);

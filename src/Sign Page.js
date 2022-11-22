import React, { useState } from 'react'

const Sign = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [Ptext, setPagetext] = useState("");

    const onGenClick = async () => {
        setIsLogin(true)
        setPagetext("Start Generating Your Verifiable Credentials and Proof Ownership")
       
    }

    const onVClick = async () => {
        setIsLogin(false)
        setPagetext("Set Your Event Conditions and Start Verifying Attendees")
    }

    const VCGen = () => {
        return (
            <div className="bg-white rounded-2xl h-100 shadow-2xl flex flex-col w-full md:w-1/2 items-center max-w-4xl transition duration-1000 ease-out">
                <h3 className='text-xl font-semibold text-blue-400 pt-4'>Generate Verifiable Credentials</h3>
                {/* Inputs */}
                <div className='flex flex-col items-center justify-center'>
                    <div class="box-content h-32 w-32 p-4 border-4"></div>
                    <button className='rounded-2xl m-2 text-white bg-blue-400 w-10px px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
                        Sign In
              </button>
                </div>
                <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                <p className='text-blue-400 mt-4 text-sm'>Event Organiser?</p>
                <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={onVClick}>Navigate To Verifier Page</p>
            </div>
        )
    }

    const VerifierCond = () => {
        return (
            <div className="bg-[#64748b] text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/2 items-center max-w-4xl transition duration-1000 ease-in">
                <h3 className='text-xl font-semibold text-white pt-2'>Set Your Event Conditions</h3>
                <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
                {/* Inputs */}
                <div className='flex flex-col items-center justify-center mt-2'>
                    <input class="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0" id="grid-last-name" type="text" placeholder="0xBC4C..." />
                    <input type='email' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Email'></input>
                    <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Password'></input>
                    <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-blue focus:outline-none focus:ring-0' placeholder='Avatar URL'></input>
                    <button className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
                        Sign Up
              </button>
                </div>
                <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
                <p className='text-white mt-4 text-sm'>Generate VCs?</p>
                <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={onGenClick}>Sign and Generate</p>
            </div>
        )
    }

    return (
        <>
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
            <main className="flex items-center w-full px-2 md:px-20">
                <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                    <p className='text-4xl text-blue-500 font-bold'>VC DAPP</p>
                    <p className='font-medium text-lg leading-1 text-zinc-800 break-normal'>{Ptext}</p>
                </div>
                {
                    isLogin ? (
                        <VCGen />
                    ) : (
                            <VerifierCond />
                        )
                }
                </main>
            </div>
        </>
    )
}

export default Sign

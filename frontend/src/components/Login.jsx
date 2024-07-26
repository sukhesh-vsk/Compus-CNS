import React from 'react'
import MapImg from '../img/map-image.png'

function Login() {
  return (
    <div className="w-full h-full flex items-start">
            <div className='relative h-full flex-1 flex items-center justify-center flex-col'>
                <div className='absolute login-text flex flex-col'>
                    <h1 className='text-4x1 text-[#060606] font-bold my-4'>Wherever You Go, We Guide</h1>
                    {/* <p className='text-xl text-white font-normal'>Start for free and get attractive offers from the community</p>*/}
                </div>
                <img src={MapImg} className="login-image" />
            </div>
            <div className='flex-1 w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
                <h1 className='max-w-[500px] mx-auto text-3xl text-[#5DB487] font-semibold mr-auto'>Compus</h1>

                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2 text-black'>Login</h3>
                        <p className='text-base mb-2 text-[#64BE8F]'>Welcome back!</p>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline none" 
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline none" 
                        />
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <div className='w-full flex items-center'>
                            <input type='checkbox' className='w-4 h-4 mr-2' />
                            <p className='text-sm text-black'>Remember me</p>
                        </div>

                        <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-black'>Forget Password</p>
                    </div>
                    <div className='w-full flex flex-col my-4'>
                        <button className='w-full text-white my-2 font-semibold bg-[#5DB487] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Login
                        </button>
                        {/* <button className='w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Register
                        </button> */}
                    </div>

                    <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black/40'></div>
                        <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
                    </div>

                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-[#060606]'>Don't have a account? <span className='font-semibold underline underline-offset-2 cursor-pointer text-[#5DB487]'>Register</span></p>
                </div>

            </div>
        </div>
    )
}

export { Login }
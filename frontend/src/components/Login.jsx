import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MapImg from '../img/map-image.png'
import axios from 'axios';

const username = 'admin';
const password = 'admin';
const token = btoa(`${username}:${password}`);

function Login() {
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    mail: '',
    pwd: ''
  }
);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8080/api/u/auth/login?mail=${formData.mail}&pwd=${formData.pwd}`, 
            { 
              headers: {
              'Authorization': `Basic ${token}`
            }}
          )
          .then((response) => {
            if(response.status == 200) {
              navigate('/');
            }
            console.log(response);
          })
          .catch((error) => {``
            console.log(error);
          });
    console.log(formData);    
  }

  return (
    <form onSubmit={handleLogin} className="w-full h-full flex flex-col md:flex-row items-start">
      <div className="relative h-1/2 md:h-full md:flex-1 flex items-center justify-center flex-col">
        <div className="absolute flex flex-col text-center md:text-left logo-text">
          <h1 className="text-2xl md:text-3xl text-[#060606] font-bold my-2">Wherever You Go,</h1>
          <h2 className="text-xl md:text-2xl font-semibold my-1 text-[#5DB487]">We Guide</h2>
        </div>
        <img src={MapImg} className="login-image w-full md:w-auto" alt="Map" />
      </div>
      <div className="flex-1 w-full md:w-1/2 h-full bg-[#f1f1f1] flex flex-col p-6 md:p-20 justify-between items-center">
        <h1 className="max-w-[500px] mx-auto text-3xl md:text-4xl text-[#5DB487] font-semibold mr-auto">Compus</h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-black">Login</h3>
            <p className="text-base mb-2 text-[#64BE8F]">Welcome back!</p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="text"
              placeholder="Email"
              name="mail"
              value={formData.username}
              onChange={handleChange}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm text-black">Remember me</p>
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-black">Forget Password</p>
          </div>
          <div className="w-full flex flex-col my-4">
          <button type="submit" className="w-full text-white my-2 font-semibold bg-[#5DB487] rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
            Login
          </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>
        </div>
        

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Don't have an account?
            <Link to="/signup" className="font-semibold underline underline-offset-2 cursor-pointer text-[#5DB487]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export { Login }

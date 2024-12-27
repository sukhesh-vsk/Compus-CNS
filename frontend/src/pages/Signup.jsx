import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MapImg from '/img/map-image.png'
import axios from 'axios';

const username = 'admin';
const password = 'admin';
const token = btoa(`${username}:${password}`);

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/u/auth/register",
            formData,
            {
              headers: {
                'Authorization': `Basic ${token}`
              }
            })
            .then((response) => {
              console.log(response);
              if (response.status === 201) {
                navigate('/');
              }
            })
            .catch((error) => {
              console.error(error);
        });

    console.log(formData);
  }

  return (
    <form className="w-full h-full flex flex-col md:flex-row items-start" onSubmit={handleSubmit}>
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
            <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-black">Signup</h3>
            <p className="text-base mb-2 text-[#64BE8F]">Create Your Account</p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="text"
              placeholder="Username"
              name='username'
              value={formData.username}
              onChange={handleChange}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm text-black">Remember me</p>
            </div>
          </div>
          <div className="w-full flex flex-col my-4">
          <button type='submit' className="w-full text-white my-2 font-semibold bg-[#5DB487] rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
              Signup
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">Already have an account?
            <Link to="/login" className="font-semibold underline underline-offset-2 cursor-pointer text-[#5DB487]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export { Signup }

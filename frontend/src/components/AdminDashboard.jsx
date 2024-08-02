import React, { useState } from 'react';
import { FaBars, FaUserCircle, FaHome, FaPlusCircle } from 'react-icons/fa';
import { IoRemoveCircle } from 'react-icons/io5';
import { IoMdLogOut } from 'react-icons/io';
import { MdGridView } from 'react-icons/md';
import { ManagePlace } from './admin';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  
  const handleAddPlaceClick = () => {
    setShowForm(true);
  }

  return (
    <div className='flex h-full'>
      {/* Sidebar */}
      <div className={`h-full px-4 py-2 h-full transition-transform shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} w-64 bg-[#5DB487]`}>
        <div className='my-2 mb-4'>
          <h1 className='text-2xl text-white font-semibold'>Admin Dashboard</h1>
        </div>
        <hr />
        <ul className='mt-3 text-white font-semi-bold'>
          <li className='mb-2 rounded hover:shadow hover:bg-emerald-600 py-2'>
            <a href='/' className='px-3'>
              <FaHome className='inline-block w-6 h-6 mr-2 -mt-2' />
              Home
            </a>
          </li>
          <li className='mb-2 rounded hover:shadow hover:bg-emerald-600 py-2'>
            <a href='' className='px-3'>
              <MdGridView className='inline-block w-6 h-6 mr-2 -mt-2' />
              View Places
            </a>
          </li>
          <li className='mb-2 rounded hover:shadow hover:bg-emerald-600 py-2 cursor-pointer' onClick={handleAddPlaceClick}>
            <span className='px-3'>
              <FaPlusCircle className='inline-block w-6 h-6 mr-2 -mt-2' />
              Add Place
            </span>
          </li>
          <li className='mb-2 rounded hover:shadow hover:bg-emerald-600 py-2'>
            <a href='' className='px-3'>
              <IoRemoveCircle className='inline-block w-6 h-6 mr-2 -mt-2' />
              Remove Place
            </a>
          </li>
          <li className='mb-2 rounded hover:shadow hover:bg-emerald-600 py-2'>
            <a href='' className='px-3'>
              <IoMdLogOut className='inline-block w-6 h-6 mr-2 -mt-2' />
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className={`flex flex-col flex-1 transition-all`}>
        {/* Navbar */}
        <nav className='px-4 py-3 w-full flex justify-between bg-[#5DB487]'>
          <div className='flex items-center text-xl'>
            <FaBars className='text-white me-4 cursor-pointer' onClick={toggleSidebar} />
            <span className='text-white font-semibold'>Compus</span>
          </div>
          <div className='flex items-center gap-x-5'>
            <div className='relative'>
              <button className='text-white group'>
                <FaUserCircle className='w-6 h-6 mt-1' />
                <div className='z-10 hidden absolute bg-white rounded-lg shadow-lg w-32 group-focus:block top-full right-0'>
                  <ul className='py-2 text-sm text-slate-700 font-semibold'>
                    <li>Name</li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </nav>
        
        {/* Main Dashboard Content */}
        <div className='flex-1 p-4'>
          {showForm && (<ManagePlace />)}
        </div>
      </div>
    </div>
  );
}

export { AdminDashboard }

import React, { useState } from 'react'
import { TbMapPinSearch } from 'react-icons/tb'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../img/Compas logoo.png'
import { MapComponent } from './MapComponent'


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div>
      <div className="search-bar-container !px-5">
        <div className='flex justify-center items-center'>
          <img src={Logo} alt="Logo" className="logo" /><p className='logo-title'>Compus</p>
        </div>
        
        <div className='search-bar flex items-center justify-center flex-1'>
          <input type="text" className="search-input" placeholder="Search..." />
          <span>
            <TbMapPinSearch className="search-icon pe-1" />
          </span>
        </div>
        
        {
          sidebarOpen 
          ? <FaTimes className="close-icon" onClick={toggleSidebar} />
          : <FaBars className="hamburger-menu" onClick={toggleSidebar} />
        }
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
      </div>

      <MapComponent />

    </div>
  )
}

export { Home }

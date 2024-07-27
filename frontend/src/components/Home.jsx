import React, { useState } from 'react'
import { TbMapPinSearch } from 'react-icons/tb'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../img/Compas logoo.png'


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="search-bar-container">
      <img src={Logo} alt="Logo" className="logo" /><p className='logo-title'>Compas</p>
      <input type="text" className="search-input" placeholder="Search..." />
      <TbMapPinSearch className="search-icon" />
      <FaBars className="hamburger-menu" onClick={toggleSidebar} />
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <FaTimes className="close-icon" onClick={toggleSidebar} />
        <ul>
          <li><a href="/signup">Signup</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </div>
  )
}

export { Home }

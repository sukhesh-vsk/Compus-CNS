import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../img/Compas logoo.png'
import { MapComponent } from './MapComponent'
import { SearchBar } from './SearchBar'
import { mapData } from '../datas/data'


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div>
      <div className="search-bar-container !px-5">
        <div className='flex justify-center items-center'>
          <img src={Logo} alt="Logo" className="logo mb-2" /><p className='ps-2 logo-title'>Compus</p>
        </div>
        
        <SearchBar places={mapData} onPlaceSelect={setSelectedPlace} />
        
        {
          sidebarOpen 
          ? <FaTimes className="close-icon" onClick={toggleSidebar} />
          : <FaBars className="hamburger-menu" onClick={toggleSidebar} />
        }
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            <a href="/signup"><li>Signup</li></a>
            <a href="/login"><li>Login</li></a>
          </ul>
        </div>
      </div>

      <MapComponent selectedPlace={selectedPlace}/>

    </div>
  )
}

export { Home }

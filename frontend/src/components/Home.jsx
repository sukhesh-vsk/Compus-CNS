import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../img/Compas logoo.png'
import { MapComponent } from './MapComponent'
import { SearchBar } from './SearchBar'
import { mapData } from '../datas/data'
import { DataPopup } from './DataPopup'


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [placeInfo, setPlaceInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const reloadPage = () => {
    window.location.reload();
  }

  return (
    <div>
      <div className="search-bar-container !px-1 md:!px-5">
        <div className='flex flex-col mb-0 justify-center items-center max-w-[120px] md:flex-row' onClick={reloadPage}>
          <img src={Logo} alt="Logo" className="logo h-10 md:h-12 lg:h-14" /><p className='text-sm md:text-xl ps-2 logo-title'>Compus</p>
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
            <li>Favourites</li>
          </ul>
        </div>
      </div>

      <MapComponent selectedPlace={selectedPlace} markerData={setPlaceInfo} togglePopup={setShowPopup}/>
      
      {showPopup && <DataPopup data={mapData[placeInfo]} hidden={showPopup} togglePopup={setShowPopup} />}

    </div>
  )
}

export { Home }

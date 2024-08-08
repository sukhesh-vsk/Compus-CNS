import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../img/Compas logoo.png';
import { MapComponent } from './MapComponent';
import { SearchBar } from './SearchBar';
import { mapData } from '../datas/data';
import { DataPopup } from './DataPopup';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [placeInfo, setPlaceInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFavourite, setShowFavourite] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const reloadPage = () => {
    window.location.reload();
  }

  const handleFavourite = () => {
    setShowFavourite(!showFavourite);
    console.log("Favourites toggled", !showFavourite);
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
        <div className={`sidebar flex flex-col gap-4 items-start ps-5 text-slate-700 ${sidebarOpen ? 'open' : ''}`}>
            <a href="/admin" className='cursor-pointer hover:text-emerald-600'>Admin</a>
            <a href="/signup" className='hover:text-emerald-600'>Signup</a>
            <a href="/login" className='hover:text-emerald-600'>Login</a>
            <a className='flex flex-row justify-around items-center cursor-pointer hover:text-emerald-600' onClick={handleFavourite}>
                <span className='flex items-center'>
                  Favourites
                  {showFavourite ? <IoIosArrowUp className='ml-1'/>: <IoIosArrowDown className='ml-1'/>}
                </span>
            </a>
            <ul className={`flex flex-col pl-1 ${showFavourite ? 'block' : 'hidden'}`}>
              <li className='hover:text-emerald-600 cursor-pointer'>Aroma</li>
              <li className='hover:text-emerald-600 cursor-pointer'>PG Seminar</li>
              <li className='hover:text-emerald-600 cursor-pointer'>Vankatram Hall</li>
              <li className='hover:text-emerald-600 cursor-pointer'>CB2 - 103</li>
              <li className='hover:text-emerald-600 cursor-pointer'>ZOHO Lab</li>
            </ul>
        </div>
      </div>

      <MapComponent selectedPlace={selectedPlace} markerData={setPlaceInfo} togglePopup={setShowPopup}/>
      
      {showPopup && <DataPopup data={mapData[placeInfo]} hidden={showPopup} togglePopup={setShowPopup} />}
    </div>
  )
}

export { Home }

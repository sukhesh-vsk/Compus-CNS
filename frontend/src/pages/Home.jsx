import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '/img/Compas logoo.png';
import { MapComponent } from './MapComponent';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DataPopup, SearchBar } from '../components';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [placeInfo, setPlaceInfo] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showFavourite, setShowFavourite] = useState(false);
  const [favourites, setFavourites] = useState([]);
  
  const [searchVisible, setSearchVisible] = useState(false);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if(placeInfo != null)
      setSearchVisible(true);
  }, [placeInfo]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const reloadPage = () => {
    window.location.reload();
  }

  const handleFavourite = () => {
    setShowFavourite(!showFavourite);
  }

  const addToFavourites = (place) => {
    if (!favourites.some(fav => fav.properties.name === place.properties.name)) {
      setFavourites([...favourites, place]);
    }
  }

  return (
    <div>
      <div className="search-bar-container !px-1 md:!px-5">
        <div className='flex flex-col mb-0 justify-center items-center max-w-[120px] md:flex-row' onClick={reloadPage}>
          <img src={Logo} alt="Logo" className="logo h-10 md:h-12 lg:h-14" /><p className='text-sm md:text-xl ps-2 logo-title'>Compus</p>
        </div>
        {(!showPopup && placeInfo != null) && (
          <SearchBar places={placeInfo} onPlaceSelect={setSelectedPlace} destination={setDestination}/>
        )}

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
              {favourites.map((fav, index) => (
                <li key={index} className='hover:text-emerald-600 cursor-pointer'>{fav.properties.name}</li>
              ))}
            </ul>
        </div>
      </div>
      
      <MapComponent setSelectedPlaceData={setSelectedPlace} markerData={setPlaceInfo} togglePopup={setShowPopup} destinationID={destination}/>
  
      {showPopup && <DataPopup data={selectedPlace} hidden={showPopup} togglePopup={setShowPopup} />}
    </div>
  )
}

export { Home }

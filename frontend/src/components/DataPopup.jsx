import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

export const DataPopup = ({ data, hidden, togglePopup }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className='flex flex-col h-60 fixed bg-gray-200 data-popup w-full p-4 absolute bottom-0 rounded-t-3xl border-gray-300 border-2'>
      <span
        className='w-full text-end font-bold pe-1 cursor-pointer text-[#5db487]'
        onClick={() => togglePopup(false)}
      >
        X
      </span>
      <div className='px-5'>
        <div className='flex justify-between items-center mb-2'>
          <p className='text-2xl font-bold tracking-wide text-slate-900'>{`Name: ${data?.features[0].properties["name"]}`}</p>
          <div className='flex space-x-4 mr-4'>
            <button className='prime text-white px-5 py-2 rounded-lg font-semibold'>Locate</button>
            <button
              className='flex items-center text-[#5DB487] text-grey px-5 py-2 rounded-lg border border-[#5DB487] font-semibold'
              onClick={handleFavoriteClick}
            >
              {isFavorited ? <FaHeart className='mr-2' /> : <FaRegHeart className='mr-2' />} 
              Add to favourites
            </button>
          </div>
        </div>
        <p className='text-md font-semibold tracking-wide mb-1 text-slate-700 '>{`Description: ${data?.features[0].properties["description"]}`}</p>
        {data?.features[0].properties["landmark"] && (
          <p className='text-md font-semibold text-slate-700'>{`Landmark: ${data.features[0].properties["landmark"]}`}</p>
        )}
      </div>
    </div>
  );
};

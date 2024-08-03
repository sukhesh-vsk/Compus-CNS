// import React from 'react';
// import { IoSearch } from "react-icons/io5";

// const ViewPlaces = () => {
//   return (
//     <div className='flex h-full flex-col items-center justify-center'>
//       <div className='w-full flex justify-center items-center mb-4 space-x-4'>
//         <div className='relative'>
//           <input 
//             type='text' 
//             placeholder='Search Place' 
//             className='px-4 py-2 border border-gray-400 text-slate-700 rounded-lg focus:outline-none focus:border-emerald-500' 
//           />
//           <IoSearch className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:bg-slate-200' />
//         </div>
//         <button className='px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg focus:outline-none'>
//           Add
//         </button>
//       </div>
//       <div className='flex-1 w-full'>
        
//       </div>
//     </div>
//   );
// }

// export { ViewPlaces }

import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

const ViewPlaces = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsPopupOpen(false);
  }

  const handleCancelClick = () => {
    setIsPopupOpen(false);
  }

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='w-full flex justify-center items-center mb-4 space-x-4'>
        <div className='relative'>
          <input 
            type='text' 
            placeholder='Search Place' 
            className='px-4 py-2 border border-gray-400 text-slate-700 rounded-lg focus:outline-none focus:border-emerald-500' 
          />
          <IoSearch className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:bg-slate-200' />
        </div>
        <button 
          className='px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg focus:outline-none'
          onClick={handleAddButtonClick}
        >
          Add Place
        </button>
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
          <div className='flex h-full flex-col items-center justify-center'>
            <div className='fixed flex-1 bg-white p-8 shadow-2xl w-full max-w-2xl'>
              <h2 className='text-xl font-bold mb-4 text-[#5DB487]'>Place Details</h2>
              <form onSubmit={handleFormSubmit} className='flex h-full flex-col'>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Block</label>
                  <input 
                    type='text' 
                    placeholder='Block name'
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                  <input 
                    type='text' 
                    placeholder='Place name'
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                  <textarea 
                    placeholder='Place Description'
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Landmark</label>
                  <input 
                    type='text' 
                    placeholder='Place Landmark'
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='flex flex-1 justify-end items-center space-x-4'>
                  <button 
                    type='submit' 
                    className='bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Add
                  </button>
                  <button 
                    type='button' 
                    className='bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className='flex-1 w-full'>
        {/* View Place Table content */}
      </div>
    </div>
  );
}

export { ViewPlaces }

import React from 'react';
import { IoSearch } from "react-icons/io5";

const ViewPlaces = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='w-full flex justify-center items-center mb-4 space-x-4'>
        <div className='relative'>
          <input 
            type='text' 
            placeholder='Search...' 
            className='px-4 py-2 border border-gray-400 text-slate-700 rounded-lg focus:outline-none focus:border-emerald-500' 
          />
          <IoSearch className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:bg-slate-200' />
        </div>
        <button className='px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg focus:outline-none'>
          Add
        </button>
      </div>
      <div className='flex-1 w-full'>
        {/* Content to display places goes here */}
      </div>
    </div>
  );
}

export { ViewPlaces }

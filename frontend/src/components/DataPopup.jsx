import React from 'react'

export const DataPopup = ({ data, hidden, togglePopup }) => {
    console.log(data);
  return (
    <div className='flex flex-col bg-gray-200 h-80 data-popup w-full p-4 absolute bottom-0 rounded-t-3xl border-gray-300 border-2'>
        <span 
          className='w-full text-end font-semibold pe-5 cursor-pointer'
          onClick={() => togglePopup(false)}
          >
            X
          </span>
        <h1 className='text-2xl font-bold'>{data?.features[0].properties["name"]}</h1>
        <h4 className='text-md font-bold'>{data?.features[0].properties["description"]}</h4>
    </div>
  )
}

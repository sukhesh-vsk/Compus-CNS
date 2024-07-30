import React from 'react'

export const DataPopup = ({ data, hidden, togglePopup }) => {
    console.log(data);
  return (
    <div className='flex flex-col bg-gray-200 h-80 data-popup w-full p-4 absolute bottom-0 rounded-t-3xl border-gray-300 border-2'>
        <span 
          className='w-full text-end font-bold pe-5 cursor-pointer text-[#5db487]'
          onClick={() => togglePopup(false)}
          >
            X
          </span>
        <div className='px-5'>
          <p className='text-2xl font-bold tracking-wide mb-2 text-slate-900'>{`Name: ${data?.features[0].properties["name"]}`}</p>
          <p className='text-md font-semibold tracking-wide mb-1 text-slate-700 '>{`Description: ${data?.features[0].properties["description"]}`}</p>
            {
              data?.features[0].properties["landmark"] && (
                <p className='text-md font-semibold text-slate-700'>{`Landmark: ${data.features[0].properties["landmark"]}`}</p>
              )
            }
            <div className='text-center mt-8'>
              <button className='prime text-white px-5 py-2 rounded-lg'>Locate</button>
            </div>
        </div>
    </div>
  )
}

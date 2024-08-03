import React from 'react'

export const ManagePlace = () => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowForm(false);
    }

  return (
    <div className='flex h-full flex-col items-center justify-center bg-opacity-10'>
        <h2 className='text-start w-full'>Add a place to the map</h2>
        <div className='flex-1 bg-white p-8 shadow-2xl w-full'>
            <h2 className='text-xl font-bold mb-4 text-[#5DB487]'>Place Details</h2>
            <form onSubmit={handleFormSubmit} className='flex h-full flex-col'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                    <input type='text' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:shadow-outline' required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Block</label>
                    <input type='text' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:shadow-outline' required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                    <textarea className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:shadow-outline' required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Landmark</label>
                    <input type='text' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:shadow-outline' required />
                </div>
                <div className='flex flex-1 justify-end items-center space-x-4'>
                    <button type='submit' className='bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                      Add
                    </button>
                    <button type='button' className='bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                      Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

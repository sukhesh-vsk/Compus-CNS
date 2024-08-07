import React, { useState } from 'react';
import { IoSearch, IoTrash } from "react-icons/io5";
import { MdEditLocationAlt } from "react-icons/md";

const ViewPlaces = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({
    block: '',
    name: '',
    description: '',
    landmark: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedPlaces = places.map((place, index) => 
        index === editingIndex ? newPlace : place
      );
      setPlaces(updatedPlaces);
      setEditingIndex(null);
    } else {
      setPlaces([...places, newPlace]);
    }
    setNewPlace({ block: '', name: '', description: '', landmark: '' });
    setIsPopupOpen(false);
  }

  const handleCancelClick = () => {
    setIsPopupOpen(false);
    setEditingIndex(null);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlace({ ...newPlace, [name]: value });
  }

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewPlace(places[index]);
    setIsPopupOpen(true);
  }

  const handleDeleteClick = (index) => {
    setPlaces(places.filter((_, i) => i !== index));
  }

  return (
    <div className='flex h-full flex-col items-center justify-center p-4'>
      <div className='w-full flex justify-center items-center mb-4 space-x-4'>
        <div className='relative'>
          <input 
            type='text' 
            placeholder='Search Place' 
            className='px-4 py-2 pr-10 border border-gray-400 text-slate-700 rounded-lg focus:outline-none focus:border-emerald-500' 
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
                    name='block'
                    placeholder='Block name'
                    value={newPlace.block}
                    onChange={handleInputChange}
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                  <input 
                    type='text' 
                    name='name'
                    placeholder='Place name'
                    value={newPlace.name}
                    onChange={handleInputChange}
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                  <textarea 
                    name='description'
                    placeholder='Place Description'
                    value={newPlace.description}
                    onChange={handleInputChange}
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Landmark</label>
                  <input 
                    type='text' 
                    name='landmark'
                    placeholder='Place Landmark'
                    value={newPlace.landmark}
                    onChange={handleInputChange}
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='flex flex-1 justify-end items-center space-x-4'>
                  <button 
                    type='submit' 
                    className='bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    {editingIndex !== null ? 'Update' : 'Add'}
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

      <div className='flex-1 w-full overflow-auto'>
        <table className='min-w-full bg-white border border-gray-300 mt-5'>
          <thead className='text-emerald-500 bg-gray-100'>
            <tr>
              <th className='py-2 px-4 border border-gray-300'>BLOCK</th>
              <th className='py-2 px-4 border border-gray-300'>NAME</th>
              <th className='py-2 px-4 border border-gray-300'>DESCRIPTION</th>
              <th className='py-2 px-4 border border-gray-300'>LANDMARK</th>
              <th className='py-2 px-4 border border-gray-300'>EDIT</th>
              <th className='py-2 px-4 border border-gray-300'>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, index) => (
              <tr key={index}>
                <td className='py-2 px-4 border border-gray-300'>{place.block}</td>
                <td className='py-2 px-4 border border-gray-300'>{place.name}</td>
                <td className='py-2 px-4 border border-gray-300 whitespace-normal break-all'>{place.description}</td>
                <td className='py-2 px-4 border border-gray-300 whitespace-normal break-all'>{place.landmark}</td>
                <td className='py-2 px-4 border border-gray-300 text-center'>
                  <MdEditLocationAlt 
                    className='text-blue-500 cursor-pointer inline-block text-xl hover:text-2xl' 
                    onClick={() => handleEditClick(index)} 
                  />
                </td>
                <td className='py-2 px-4 border border-gray-300 text-center'>
                  <IoTrash 
                    className='text-red-500 cursor-pointer inline-block text-xl hover:text-2xl' 
                    onClick={() => handleDeleteClick(index)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { ViewPlaces }

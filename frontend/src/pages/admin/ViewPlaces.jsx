import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch, IoTrash } from "react-icons/io5";
import { MdEditLocationAlt } from "react-icons/md";

const username = 'admin';
const password = 'admin';
const token = btoa(`${username}:${password}`);

const ViewPlaces = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [showBlocks, setShowBlocks] = useState(false);
  const [newPlace, setNewPlace] = useState({
    id: '',
    coords: '',
    description: '',
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/m/nodes`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    })
    .then(response => {
      setPlaces(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if (showBlocks) {
      axios.get(`http://localhost:8080/api/m/blocks`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      })
      .then(response => {
        setBlocks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [showBlocks]);

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nodeData = {
      id: newPlace.id,
      coords: newPlace.coords.split(',').map(Number),
      desc: newPlace.description,
    };

    const axiosRequest = editingIndex !== null
      ? axios.put(`http://localhost:8080/api/m/nodes/update`, nodeData, {
            headers: { Authorization: `Basic ${token}` }
        })
      : axios.post(`http://localhost:8080/api/m/nodes/add`, [nodeData], {
            headers: { Authorization: `Basic ${token}` }
        });

    axiosRequest
      .then(response => {
        if (editingIndex !== null) {
          const updatedPlaces = [...places];
          updatedPlaces[editingIndex] = nodeData;
          setPlaces(updatedPlaces);
        } else {
          setPlaces([...places, nodeData]);
        }
        setNewPlace({ id: '', coords: '', description: '' });
        setIsPopupOpen(false);
        setEditingIndex(null);
      })
      .catch(error => {
        console.log("Error adding/updating node:", error);
      });
  };

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
    setNewPlace({
      id: places[index].id,
      coords: places[index].coords.join(','),
      description: places[index].description,
    });
    setIsPopupOpen(true);
  }

  const handleDeleteClick = (index) => {
    const placeToDelete = places[index];

    axios.delete(`http://localhost:8080/api/m/nodes/delete`, {
      headers: {
        Authorization: `Basic ${token}`
      },
      params: { desc: placeToDelete.description } 
    })
    .then(() => {
      setPlaces(places.filter((_, i) => i !== index));
    })
    .catch(error => {
      console.log("Error deleting node:", error);
    });
  }

  const filteredPlaces = showBlocks
    ? places.filter(place => blocks.some(block => block.blockID.id === place.id))
    : places;

  return (
    <div className='flex flex-col items-center justify-center p-4'>
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
        <button 
          className='px-4 py-2 border border-emerald-500 text-emerald-500 font-semibold rounded-lg focus:outline-none'
          onClick={() => setShowBlocks(!showBlocks)}
        >
          {showBlocks ? "Hide Blocks" : "Show Blocks"}
        </button>
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
          <div className='flex h-full flex-col items-center justify-center'>
            <div className='fixed flex-1 bg-white p-8 shadow-2xl w-full max-w-2xl'>
              <h2 className='text-xl font-bold mb-4 text-[#5DB487]'>Place Details</h2>
              <form onSubmit={handleFormSubmit} className='flex h-full flex-col'>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Node ID</label>
                  <input 
                    type='text' 
                    name='id'
                    placeholder='Node ID'
                    value={newPlace.id}
                    onChange={handleInputChange}
                    className='shadow border-b w-full py-2 px-3 text-gray-700 leading-snug focus:outline-none focus:border-emerald-500 focus:shadow-lg' 
                    required 
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Coordinates</label>
                  <input 
                    type='text' 
                    name='coords'
                    placeholder='Coordinates'
                    value={newPlace.coords}
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
              <th className='py-2 px-4 border border-gray-300'>NODE ID</th>
              <th className='py-2 px-4 border border-gray-300'>COORDINATES</th>
              <th className='py-2 px-4 border border-gray-300'>DESCRIPTION</th>
              <th className='py-2 px-4 border border-gray-300'>EDIT</th>
              <th className='py-2 px-4 border border-gray-300'>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaces.map((place, index) => (
              <tr key={index} className='text-center'>
                <td className='py-2 px-4 border border-gray-300'>{place.id}</td>
                <td className='py-2 px-4 border border-gray-300'>{place.coords.join(', ')}</td>
                <td className='py-2 px-4 border border-gray-300'>{place.description}</td>
                <td className='py-2 px-4 border border-gray-300'>
                  <button onClick={() => handleEditClick(index)}>
                    <MdEditLocationAlt className='text-emerald-500 cursor-pointer hover:text-emerald-700' />
                  </button>
                </td>
                <td className='py-2 px-4 border border-gray-300'>
                  <button onClick={() => handleDeleteClick(index)}>
                    <IoTrash className='text-red-500 cursor-pointer hover:text-red-700' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ViewPlaces };

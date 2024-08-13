import React, { useEffect, useState } from 'react';
import { TbMapPinSearch } from 'react-icons/tb';

export const SearchBar = ({ places, onPlaceSelect, destination }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);

    const searchData = places.map((place) => ({
        name: place.name,
        id: place.blockID.id,
    })).sort((a, b) => a.name.localeCompare(b.name));

    const matchSearchTerm = searchData.filter((place) => {
        return place.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDataChange = (e) => {
        setSearchTerm(e.target.value);
        setShowResults(true);
    };

    const handleSearch = (place) => {
        setSearchTerm(place.name);
        setShowResults(false);
        // console.log("Place id from =>", place.id);
        onPlaceSelect(place.id);
        destination(place.id);
    };

    return (
        <span className='search-bar flex justify-center flex-1'>
            <div className='flex items-center justify-center flex-1'>
                <input 
                    type="text"
                    className={`search-input text-xs md:text-base ${searchTerm === '' ? 'shadow-search' : ''}`}
                    placeholder="Search campus locations"
                    value={searchTerm}
                    onChange={handleDataChange}
                    onFocus={() => setShowResults(true)}
                />
                <span>
                    <TbMapPinSearch className="search-icon pe-1" />
                </span>
            </div>
            {(showResults && matchSearchTerm.length > 0 && searchTerm !== '') && 
                (<div className='absolute search-input mt-14 bg-white shadow-search'>
                    {matchSearchTerm.slice(0, 8).map((place, index) => {
                        return (
                            <div 
                                key={index}
                                className='search-result text-sm text-slate-600 font-medium cursor-pointer my-1 hover:text-slate-700'
                                onClick={() => handleSearch(place)}
                            >
                                {place.name}
                            </div>
                        )
                    })}
                </div>)
            }
        </span>
    )
};

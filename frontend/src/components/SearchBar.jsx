import React, { useEffect, useState } from 'react'
import { TbMapPinSearch } from 'react-icons/tb'

export const SearchBar = ({ places }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const searchData = Object.keys(places).sort();

    const matchSearchTerm = searchData.filter((place) => {
        return place.toLowerCase().includes(searchTerm.toLowerCase());
    })
    
    const handleDataChange = (e) => {
        setSearchTerm(e.target.value);
        // console.log(searchData);
        // console.log(`Search : ${e.target.value},  ${matchSearchTerm}`);
    }

    useEffect(() => {
        console.log(matchSearchTerm);
    }, [searchTerm]);

    return (
        <span className='search-bar flex justify-center flex-1'>
            <div className='flex items-center justify-center flex-1'>
                <input 
                    type="search"
                    className={`search-input ${searchTerm === '' ? 'shadow-search' : ''}`}
                    placeholder="Search campus locations"
                    value={searchTerm}
                    onChange={handleDataChange}
                />
                <span>
                    <TbMapPinSearch className="search-icon pe-1" />
                </span>
            </div>
            {searchTerm !== '' && 
                (<div className='absolute search-input mt-14 bg-white shadow-search'>
                    {matchSearchTerm.map((place) => {
                        return (
                            <div key={place} className='search-result text-sm text-slate-600 font-medium'>
                                {place}
                            </div>
                        )
                    })}
                </div>)
                }
        </span>
    )
}

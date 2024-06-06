import React from 'react'
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";

type Props = {}

function SearchBar({}: Props) {
  return (
    <div className="w-full h-8 px-14 border border-primary-grey rounded flex flex-row justify-between items-center">
        <input 
            className='h-7 border-none w-2/3 focus:border-primary-white'
            type="text"
            placeholder='Search' 
        />
        <IoIosSearch className="w-3 h-3"/>
    </div>
  )
}

export default SearchBar;
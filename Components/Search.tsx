import React from 'react'
import { FaSearch } from "react-icons/fa";
import FilterDropDown from './Motion/FilterBtn';

export default function Search() {
  return (
    <div className="m-5 flex  items-center justify-center gap-3">
      <div className=" bg-gray-300/50 dark:bg-slate-700/50 p-4 rounded-lg w-full md:w-[30rem] flex shadow dark:shadow-slate-700 backdrop-blur-md ">
        <form className="search-container inline-block relative w-4/5">
      <input type="text" placeholder="Search Blog" name='search' className='bg-transparent w-full outline-none '/>
      <button type="submit" className=' absolute right-5 top-0 bottom-0 opacity-50' ><FaSearch size={20} /></button>
        </form>
        <FilterDropDown/>
      </div>
    </div>
  )
}

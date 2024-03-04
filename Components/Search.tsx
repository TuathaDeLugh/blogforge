import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="m-5 flex  items-center justify-center gap-3">
      <div className=" bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-full md:w-[30rem] ">
        <form className="search-container inline-block relative w-4/5">
      <input type="text" placeholder="Search Blog" name='search' className='bg-transparent w-full outline-none '/>
      <button type="submit" className=' absolute right-5 top-0 bottom-0 opacity-50' ><FaSearch size={20} /></button>
        </form>
      <button className='border-l border-black dark:border-gray-500 w-1/5'>Filter</button>
      </div>
    </div>
  )
}

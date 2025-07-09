import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection') && showSearch){
            setVisible(true);
        } else {
            setVisible(false)
        }
    })

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex item-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2  '>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search here' className='flex-1 outline-none bg-inherit text-sm ' />
            <HiOutlineMagnifyingGlass className='w-4'/>
        </div>
        <HiXMark onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer'/>
    </div>
  ) : (
    null
  )
}

export default SearchBar
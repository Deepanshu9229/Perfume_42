import React from 'react'
import { assets } from '../assets/asset'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-sm bg-white border-b">
      <img className="w-[100px] object-contain rounded-sm" src={assets.logo} alt="Logo" />
      <button className="bg-gray-800 text-white px-5 py-2 rounded-full text-sm hover:bg-gray-700 transition">Logout</button>
    </div>
  )
}

export default Navbar

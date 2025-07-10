import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusCircleIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r bg-white shadow-sm">
      <div className="flex flex-col gap-4 pt-8 px-6 text-sm font-medium">

        <NavLink to="/add" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition">
          <PlusCircleIcon className="w-6 h-6 text-gray-700" />
          <span className="hidden md:block ">Add Item</span>
        </NavLink>

        <NavLink to="/list" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition" >
          <ClipboardDocumentListIcon className="w-6 h-6 text-gray-700" />
          <span className="hidden md:block ">List Items</span>
        </NavLink>

        <NavLink to="/order" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition" >
          <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-700" />
          <span className="hidden md:block ">Orders</span>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar

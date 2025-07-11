import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) setList(response.data.products)
      else toast.error(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})

      if(response.data.message){
        toast.success(response.data.message);
        await fetchList();
      } else toast.error(response.data.message)
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 font-semibold text-lg'>All Product List</p>
      <div className='flex flex-col gap-2'>

        {/* -------- list table title------ */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Action</p>
        </div>

        {/* --------Product list --------- */}
        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm' key={index}>
            <img className='w-12 h-12 object-cover' src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category[0]}</p>
            <p className='hidden md:block'>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500'>X</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List

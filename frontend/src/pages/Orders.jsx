import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  return (
    <div className=' pt-16 max-w-5xl mx-auto px-4 '>
      <div className='text-2xl font-semibold mb-6'>
        <h1>My Orders</h1>
      </div>

      <div >
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-4 text-sm'>
                <img src={item.img[0]} alt={item.name} className='w-20 h-20 object-cover rounded'/>
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: 100ML</p>
                  </div>
                  <p className='mt-2 text-sm'>Date: <span className='text-gray-400'>12 July 2025</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between items-center md:justify-end md:gap-6'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-green-500'></span>
                  <p className='text-sm md:text-base'>Ready to ship</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded hover:bg-gray-100'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders

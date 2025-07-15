import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(`${backendUrl}/api/order/userorders`,{},{ headers: { token } })

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            })
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch orders")
    }
  }

useEffect(() => {
  if (token) loadOrderData();
}, [token]);


  return (
    <div className='pt-16 max-w-5xl mx-auto px-4'>
      <h1 className='text-2xl font-semibold mb-6'>My Orders</h1>

      {orderData.length === 0 ? (
        <p className='text-gray-500'>No orders found.</p>
      ) : (
        orderData.map((item, index) => (
          <div key={index} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-4 text-sm'>
              <img
                src={item.image?.[0] || '/placeholder.png'}
                alt={item.name}
                className='w-20 h-25 object-cover rounded'
              />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1 text-sm'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1 text-sm'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between items-center md:justify-end md:gap-6'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className='border px-4 py-2 text-sm font-medium rounded hover:bg-gray-100'
              >
                Track Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders

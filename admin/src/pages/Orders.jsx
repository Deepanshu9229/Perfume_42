import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/asset';

const currency = '$';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (ev, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: ev.target.value },
        { headers: { token } }
      );
      if (response.data.success) await fetchAllOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='px-4 py-2'>
      <h3 className='text-lg font-semibold mb-4'>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg shadow-sm'
          >
            <img className='w-12' src={assets.box} alt="box" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p className='py-0.5' key={index}>
                    {item.name} X {item.quantity}{' '}
                    <span className='text-gray-500'>{item.size}</span>
                    {index !== order.items.length - 1 && <span> , </span>}
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ' , '}</p>
                <p>{order.address.city + ', ' +order.address.state + ', ' +order.address.country +' - ' +order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px] font-semibold'>
              {currency}
              {order.amount}
            </p>
            <select onChange={(ev) => statusHandler(ev, order._id)} value={order.status} className='p-2 font-semibold border border-gray-400 rounded' >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

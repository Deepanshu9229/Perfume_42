import React, { useContext, useState } from 'react'
import CartTotal from '../components/cartTotal'
import { assets } from '../assets/assets.js'
import { ShopContext } from '../context/ShopContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const navigate = useNavigate() 

  const {backendUrl, token, cartItems,setCartItems, getCartAmount,delivery_fee, products} = useContext(ShopContext)

  const [formData, setFormData] = useState({firstName: "", lastName: "", email: "",street: "", city: "", state: "", zipcode: "", country: "", phone: ""})

  const onchangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : 'Order Payment',
      description : 'Order Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {header:{token}})
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log();
          toast.error(error)
        }
        
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }



  const onSubmithandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size]
          if (quantity > 0) {const product = products.find(p => p._id === productId)
            if (product) {
              const itemInfo = {...structuredClone(product),size,quantity}
              orderItems.push(itemInfo)}
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        
        //paymentMethod: method // ✅ Add payment method to backend payload
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {headers: {token}})
  
          if (response.data.success) {
            toast.success('Order placed successfully!')
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break
        }

         case 'razorpay':

            const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
            if(responseRazorpay.data.success){
              // console.log(responseRazorpay.data.order );
              initPay(responseRazorpay.data.order)
              
              
            }

          break;

        default:
          toast.error("Selected payment method not implemented yet.")
          break
      }

    } catch (error) {
      console.error(error)
      toast.error("Failed to place order. Try again later.")
    }
  }

  return (
    <form onSubmit={onSubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* -------------------------- Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <h1>DELIVERY INFORMATION</h1>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onchangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onchangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Id' />
        <input required onChange={onchangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street Address' />
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onchangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
          <input required onChange={onchangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onchangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tel" placeholder='Contact Number' />
      </div>

      {/* ------------------------ Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <h1>PAYMENT METHOD</h1>
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe} alt="Stripe" />
            </div> */}
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

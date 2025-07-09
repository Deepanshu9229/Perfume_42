import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { HiOutlineTrash } from 'react-icons/hi2'
import CartTotal from '../components/cartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    //console.log(tempData); // [{_id:'002', size:'10ML', quantity:1},{},{}....]
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className=' pt-14 max-w-4xl mx-auto px-4'>
      <div className='text-2xl mb-6 font-semibold'>
        <h1>Your Cart</h1>
      </div>

      {cartData.length === 0 ? (
        <p className='text-center text-gray-500'>Your cart is empty.</p>
      ) : (
        <div className='divide-y'>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            if (!productData) return null; // product not found

            return (
              <div key={index} className='py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-gray-700'>
                <div className='flex items-start gap-3 mt-2'>
                  <img className='w-20 sm:w-24 rounded-md object-cover' src={productData.img[0]} alt={productData.name}/>
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-3 mt-2'>
                      <p className='text-gray-800 font-semibold'>{currency}{productData.price}</p>
                      <p className='px-2 py-1 border rounded text-xs sm:text-sm bg-slate-100'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-4 sm:justify-end'>
                  <input onChange={(e)=>e.target.value===''||e.target.value==='0'?null:updateQuantity(item._id, item.size, Number(e.target.value))} type='number' min={1} value={item.quantity}  className='w-16 px-2 py-1 border rounded'/>
                  <button 
                  onClick={() => {
                    if(item.quantity >= 1)updateQuantity(item._id, item.size, item.quantity-1);
                    else updateQuantity(item._id, item.size, 0)
                  } }
                  className='text-red-500 hover:text-red-700 transition'aria-label='Remove item'><HiOutlineTrash size={18} /></button>
                </div>
              </div>
            )
          })}
          <div className='flex justify-end mt-12'>
            <div className='w-full sm:w-[450px]'>
                <CartTotal/>
                <div className='w-full text-end'>
                  <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 rounded-sm hover:bg-gray-900'>PROCEED TO CHECKOUT</button>
                </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

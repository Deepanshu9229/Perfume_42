import React from 'react'
import { assets } from '../assets/assets'
import { HiOutlineCheckBadge } from 'react-icons/hi2'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-15 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400 font-light'>We have no asked exchange policy</p>
        </div>
        <div>
            <img src={assets.returnn} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400 font-light'>We have no asked return policy</p>
        </div>
        <div>
            <img src={assets.support} alt="" className='w-10 m-auto mb-7'/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400 font-light'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy
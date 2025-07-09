import React from 'react'
import contactUs from '../assets/contactUs.jpg'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <h1>CONTACT US</h1>
      </div>

      <div className='m-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={contactUs} alt="" className='w-full md:max-w-[480px]' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Willms Station <br /> Suit 350, Washington</p>
          <p className='text-gray-500'> Tel : (415) 555-0132 <br /> Email : admin@dees.com </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at The Dees</p>
          <p className='text-gray-500'>Learn more about our team and job opening.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default Contact
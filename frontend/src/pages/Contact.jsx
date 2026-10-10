import React from 'react';
import contactUs from '../assets/contactUs.jpg';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className='px-4 sm:px-8 md:px-10'>
      <div className='text-center py-10 border-t border-gray-200'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-gray-800 uppercase'>
          CONTACT US
        </h1>
        <p className='text-sm text-gray-500 font-light tracking-wider uppercase mt-2'>
          Visit our store or get in touch with our team
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 mb-24'>
        <img 
          src={contactUs} 
          alt="Contact DEES" 
          className='w-full md:max-w-[480px] object-cover' 
        />
        <div className='flex flex-col justify-center items-start gap-6 text-sm sm:text-base'>
          <div>
            <p className='font-semibold text-lg text-gray-700'>Our Flagship Store</p>
            <p className='text-gray-500 font-light mt-2 leading-relaxed'>
              #42, 100 Feet Road, Indiranagar <br />
              Bengaluru, Karnataka 560038, India
            </p>
          </div>

          <div>
            <p className='text-gray-500 font-light'>
              Tel: +91 80 4123 4567 <br />
              Email: care@dees.com
            </p>
          </div>

          <div>
            <p className='font-semibold text-lg text-gray-700'>Careers at DEES</p>
            <p className='text-gray-500 font-light mt-1'>Learn more about our team and current openings.</p>
          </div>

          <a 
            href="mailto:careers@dees.com"
            className='border border-black px-8 py-4 text-xs sm:text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-all duration-500'
          >
            Explore Jobs
          </a>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
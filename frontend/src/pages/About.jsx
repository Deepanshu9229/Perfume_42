import React from 'react';
import aboutUs from '../assets/aboutUs.jpg'; 
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='px-4 md:px-16 lg:px-32'>
      <div className='text-2xl text-center pt-8 border-t'>
        <h1>About Us</h1>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>
        <img src={aboutUs} alt="About Us" className='w-full md:max-w-[450px] rounded-lg shadow-md' />
        <div className='space-y-4 text-gray-800'>
          <p>We are a team of passionate professionals committed to delivering high-quality solutions that add real value to our customers’ lives. Our focus is on combining innovation, efficiency, and integrity to build products and services that truly make a difference.</p>
          <p>With years of experience in our domain, we strive to stay ahead of industry trends, leveraging cutting-edge technologies and customer feedback to continuously improve. Our approach is client-centric, meaning we listen, adapt, and deliver based on your needs.</p>
          <b className='text-gray-800 block'>Our Mission</b>
          <p>Our mission is to empower individuals and businesses through reliable, user-friendly, and impactful solutions. We aim to build lasting relationships with our clients by exceeding expectations and maintaining the highest standards of professionalism.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <h1>Why Choose Us</h1>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='flex-1 border p-8 sm:p-10 flex flex-col gap-4  shadow-sm bg-white'>
          <b>Quality Assurance:</b> 
          <p className='text-gray-600'>We prioritize quality in everything we do—from product design to final delivery. Every step of our process is carefully monitored to ensure the highest level of performance, reliability, and satisfaction for our customers.</p>
        </div>
        <div className='flex-1 border p-8 sm:p-10 flex flex-col gap-4  shadow-sm bg-white'>
          <b>Convenience:</b> 
          <p className='text-gray-600'>Our services are designed with your convenience in mind. We provide intuitive interfaces, streamlined processes, and responsive support to ensure that you have a seamless experience every step of the way.</p>
        </div>
        <div className='flex-1 border p-8 sm:p-10 flex flex-col gap-4  shadow-sm bg-white'>
          <b>Exceptional Customer Service:</b> 
          <p className='text-gray-600'>Our dedicated support team is always ready to assist you. Whether you need help with onboarding, have a technical issue, or simply want to provide feedback, we’re here to make sure you feel heard and supported.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;

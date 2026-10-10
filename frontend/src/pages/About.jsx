import React from 'react';
import aboutUs from '../assets/aboutUs.jpg'; 
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className='px-4 sm:px-8 md:px-10'>
      <div className='text-center py-10 border-t border-gray-200'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-gray-800 uppercase'>
          ABOUT US
        </h1>
        <p className='text-sm text-gray-500 font-light tracking-wider uppercase mt-2'>
          The essence of artisanal perfumery crafted in Bengaluru
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 lg:gap-16 items-center'>
        <img 
          src={aboutUs} 
          alt="About DEES" 
          className='w-full md:max-w-[450px] object-cover' 
        />
        <div className='space-y-4 text-gray-600 font-light text-sm sm:text-base leading-relaxed'>
          <p>
            Born in <strong className='font-normal text-gray-800'>Indiranagar, Bengaluru</strong>, <strong className='font-normal text-gray-800'>DEES</strong> was founded on a passion for authentic artisanal fragrance. We believe a scent is a personal signature—an evocative memory that lingers long after you leave.
          </p>
          <p>
            Our formulations combine pure botanical essences, rare woods, and precious amber sourced with integrity from master distillers worldwide. Every bottle is carefully blended to provide high longevity, refined projection, and timeless sophistication.
          </p>
          <b className='text-gray-800 block pt-2 font-normal text-base uppercase tracking-wider'>
            Our Philosophy
          </b>
          <p>
            We curate minimalist, modern fragrances designed for everyday elegance and special moments alike. From crisp daytime blends to rich evening elixirs, DEES offers luxury scents crafted without compromise.
          </p>
        </div>
      </div>

      <div className='text-center py-10'>
        <h2 className='text-2xl sm:text-3xl font-light tracking-[0.15em] text-gray-800 uppercase'>
          WHY CHOOSE US
        </h2>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='flex-1 border border-gray-200 p-8 sm:p-10 flex flex-col gap-3 bg-white'>
          <b className='font-semibold text-gray-800'>Authentic Formulations</b> 
          <p className='text-gray-500 font-light leading-relaxed'>
            High-concentration extrait and eau de parfum blends made with pure, premium aroma ingredients for long-lasting sillage.
          </p>
        </div>
        <div className='flex-1 border-y md:border-y md:border-x-0 border-gray-200 p-8 sm:p-10 flex flex-col gap-3 bg-white'>
          <b className='font-semibold text-gray-800'>Seamless Experience</b> 
          <p className='text-gray-500 font-light leading-relaxed'>
            Carefully packaged deliveries across India with easy tracking, secure payments, and dedicated assistance.
          </p>
        </div>
        <div className='flex-1 border border-gray-200 p-8 sm:p-10 flex flex-col gap-3 bg-white'>
          <b className='font-semibold text-gray-800'>Customer Concierge</b> 
          <p className='text-gray-500 font-light leading-relaxed'>
            Personalized scent recommendations and responsive support to ensure you discover your signature fragrance.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;

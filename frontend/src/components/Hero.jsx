import React, { useContext } from 'react';
import h1Video from '../assets/h3.mp4';
import { ShopContext } from '../context/ShopContext';



const Hero = () => {

  const{navigate} = useContext(ShopContext);

  const onClickHandle = ()=>{
    navigate('/collections')
  }

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[79vh] flex items-center justify-center text-white overflow-hidden">
      
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={h1Video}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 px-4 text-center">
        <p className="tracking-widest text-sm sm:text-lg md:text-xl mb-4 max-w-2xl mx-auto">
          THE DEES PRESENTS
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-12">
          Premium Fragrance Experience
        </h1>
        <button onClick={()=>onClickHandle()} className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium  hover:bg-black hover:text-white transition-all duration-400 ">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;

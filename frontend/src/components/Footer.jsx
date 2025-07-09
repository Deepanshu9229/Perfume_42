import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-8 py-8 text-center text-sm text-black font-light">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-5 mb-6">

        {/* Shipping info
        <div className="flex items-center gap-2">
          <img
            src="https://flagcdn.com/in.svg"
            alt="IN Flag"
            className="w-5 h-4 object-cover"
          />
          <span>Ship to:</span>
          <span className="underline cursor-pointer">India</span>
        </div> */}

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About us</a>
          <a href="#" className="hover:underline">Delivery</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Get In Touch</a>
        </div>
      </div>

      {/* Brand / Signature */}
      <h1 className="text-3xl font-bold tracking-widest mt-4">DEES</h1>
      <p className="text-xs text-gray-500 mt-6 mb-5">&copy; {new Date().getFullYear()} DEES. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

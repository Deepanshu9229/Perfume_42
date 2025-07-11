import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { HiOutlineUserCircle, HiOutlineShoppingBag, HiBars3, HiXMark } from 'react-icons/hi2';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
    
  }

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sidebar') && !event.target.closest('.sidebar-trigger')) {
        setMobileSidebarVisible(false);
      }
    };

    if (mobileSidebarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileSidebarVisible]);

  // Close mobile sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileSidebarVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebars = () => {
    setMobileSidebarVisible(false);
  };

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/collections', label: 'COLLECTIONS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' }
  ];

  return (
    <>
      {/* Backdrop */}
      {mobileSidebarVisible && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={closeSidebars}
        />
      )}

      <nav className="flex items-center justify-between py-7 font-medium relative z-30">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to={'/'}><h1 className="font-bold text-2xl tracking-widest">DEES</h1></Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `group flex flex-col items-center gap-1 transition-colors duration-200 hover:text-black ${isActive ? 'text-black' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <hr className={`w-2/4 h-[1.5px] border-none bg-gray-700 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`} />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <button type="button" className="sidebar-trigger p-1 rounded-full transition-colors duration-200 hover:bg-gray-100" aria-label="Search" >
            <MdSearch onClick={() => setShowSearch(true)} className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-200" />
          </button>

          {/* Profile Icon */}
          <div className='group relative'>
            <Link to='/login'>
              <HiOutlineUserCircle className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-200 cursor-pointer" />
            </Link>
            {/* drop down menu */}
            {token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='bg-slate-100 text-gray-500 rounded-md shadow-lg'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5'>
                  <Link to='/profile' className='cursor-pointer hover:text-black'>My Profile</Link>
                  <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
                  <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div>
            </div>

            }
          </div>

          {/* Shopping Cart */}
          <Link to="/cart" className="relative p-1 rounded-full transition-colors duration-200 hover:bg-gray-100" aria-label="Shopping cart" >
            <HiOutlineShoppingBag className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-200" />
            <span className="absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[8px] font-medium">{getCartCount()}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button type="button" onClick={() => setMobileSidebarVisible(!mobileSidebarVisible)} className="sidebar-trigger sm:hidden p-1 rounded-full transition-colors duration-200 hover:bg-gray-100" aria-label="Mobile menu" aria-expanded={mobileSidebarVisible} >
            <HiBars3 className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-200" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <aside
        className={`sidebar sm:hidden fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out z-50 ${mobileSidebarVisible ? 'translate-x-0' : 'translate-x-full'} w-64`} aria-hidden={!mobileSidebarVisible}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button type="button" onClick={() => setMobileSidebarVisible(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Close mobile menu" >
              <HiXMark className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setMobileSidebarVisible(false)}
                  className={({ isActive }) =>
                    `group flex flex-col items-start px-3 py-3 text-sm font-medium transition-colors duration-200 ${isActive
                      ? 'text-black'
                      : 'text-gray-700 hover:text-black'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <hr className={`w-2/3 h-[1.5px] border-none bg-gray-700 mt-1 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { HiXMark, HiBars3 } from 'react-icons/hi2';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [season, setSeason] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // useEffect(() => {
  //   setFilterProducts(products); //all collections / commented coz already this done in applyfilter function
  // }, [products]);

  const toogleCategory = (e) => { //for filter of category checkbox- ---------
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item != e.target.value))// Already selected → remove it
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  useEffect(() => {
    console.log(category);

  }, [category])

  const toggleSeason = (e) => { //for filter of season wise checkbox -----------
    if (season.includes(e.target.value)) {
      setSeason(prev => prev.filter(item => item != e.target.value))
    } else {
      setSeason(prev => [...prev, e.target.value]);
    }
  }
  useEffect(() => {
    console.log(season);

  }, [season])

  // Filtering logic for category & season---------
  const applyFilter = () => {
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) //for searching in search bar
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => item.category.some(cat => category.includes(cat)));
    }
    if (season.length > 0) {
      productsCopy = productsCopy.filter(item => item.season.some(sea => season.includes(sea)));
    }
    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, season, search, showSearch, products])

  //------sorting logic
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch(sortType){
      case 'highToLow' : setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
      break;
      
      case 'lowToHigh' : setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
      break;

      default : applyFilter();
      break;
    }
  }
  useEffect(()=>{
    sortProduct();
  },[sortType])



  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t border-gray-200 relative">

      {/* Toggle Filter Button (visible only on mobile) */}
      <div className="sm:hidden mb-4">
        <button
          className="flex items-center text-base font-medium text-gray-800 border border-gray-300 rounded px-4 py-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          {showFilter ? (
            <span className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <HiXMark className="h-5 w-5 text-gray-500" />
            </span>
          ) : (
            <span className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <HiBars3 className="h-5 w-5 text-gray-500" />
            </span>
          )}


        </button>

      </div>

      {/* Filter Sidebar */}
      <div
        className={`${showFilter ? 'block' : 'hidden'
          } sm:block border-gray-300 sm:border-none sm:min-w-60`}
      >
        {/* Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-0 sm:mt-6 bg-white sm:bg-transparent">
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="Men" onChange={toogleCategory} /> Men
            </label>
            <label className="flex gap-2 items-center">
              <input className="w-3" type="checkbox" value="Women" onChange={toogleCategory} /> Women
            </label>
          </div>
        </div>

        {/* Season Filter */}
        <div className="border border-gray-300 pl-5 py-3 my-6 bg-white sm:bg-transparent">
          <p className="mb-3 text-sm font-medium">SEASON</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Summer', 'Monsoon', 'Autumn', 'Winter', 'All-Season'].map((season) => (
              <label key={season} className="flex gap-2 items-center">
                <input className="w-3" type="checkbox" value={season} onChange={toggleSeason} /> {season}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid or List */}
      <div className="flex-1">

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <p className="text-center text-gray-800">All Collections</p>
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 py-1 rounded' defaultValue="" >
            <option value="lowToHigh">Sort by : Low to High</option>
            <option value="highToLow">Sort by : High to Low</option>
            <option value="relevant">Sort by : Relevance</option>
          </select>
        </div>

        {/*  map and display our products here */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image[0]} />
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default Collections;

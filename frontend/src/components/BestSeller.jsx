import React, { useContext, useState, useEffect } from 'react'
import {ShopContext} from '../context/ShopContext'
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // console.log("Loaded products: ", products);
      const bestProduct = products.filter((item)=>(item.bestSeller));
      setBestSeller(bestProduct.slice(0,5))
    
    }, [products])
    
 return (
    <div className="my-10 px-4 sm:px-8 md:px-10">
      <div className="text-center py-15">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-gray-800 mb-4">
          BEST SELLER
        </h2>
        {/* Elegant subtitle */}
        <p className="text-sm sm:text-base text-gray-600 font-light tracking-wider uppercase max-w-md mx-auto">
          Discover our Bestseller fragrances
        </p>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 gap-y-6">

        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={Array.isArray(item.image) ? item.image[0] : item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-16"></div>
    </div>
  );
}

export default BestSeller
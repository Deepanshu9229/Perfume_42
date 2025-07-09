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
      <div className="text-center py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          BEST SELLER
        </h2>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 gap-y-6">

        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={Array.isArray(item.img) ? item.img[0] : item.img}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller
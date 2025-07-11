import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products?.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]); // Include products as dependency

  return (
    <div className="my-10 px-4 sm:px-8 md:px-10">
      <div className="text-center py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Latest Collections
        </h2>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 gap-y-6">


        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={Array.isArray(item.image) ? item.image[0] : item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;

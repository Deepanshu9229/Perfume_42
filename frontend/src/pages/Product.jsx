import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { HiOutlineStar, HiStar as HiSolidStar } from 'react-icons/hi2';
import { MdBorderAll } from 'react-icons/md';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return (
    <div className="max-w-7xl mx-auto py-8">
      {productData ? (
        <>
          {/* -------------Product main section */}
          <div className="flex flex-col sm:flex-row">
            {/* ------------------Gallery thumbnails */}
            <div className="hidden sm:flex flex-col gap-4 w-24 mr-2">
              {productData.img?.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  alt=""
                  className="w-full rounded-lg border cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>

            {/* ----------------Main image */}
            <div className="flex-1 flex justify-center items-center">
              <img
                src={productData.img?.[0]}
                alt={productData.name}
                className="w-full max-w-[320px] sm:max-w-[400px] h-[450px] rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* ---------------Product info */}
            <div className="flex-1 space-y-6 mx-2">
              <h1 className="font-semibold text-4xl text-gray-900">{productData.name}</h1>
              <div className="flex items-center gap-1 text-yellow-500">
                <HiSolidStar />
                <HiSolidStar />
                <HiSolidStar />
                <HiSolidStar />
                <HiOutlineStar className="w-4 h-4" />
                <span className="ml-2 text-gray-600 text-sm">(123 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{currency}{productData.price}</p>
              <p className="text-gray-700 text-base leading-relaxed">{productData.description || "This is a premium-quality product designed to elevate your style."}</p>
              <div className='flex-1 flex-col my-8'>
                <p className='py-4'>Select Size</p>
                <div className='flex gap-2'>
                  {productData.size.map((item, index) => (
                    <button
                      onClick={() => setSize(item)}
                      className={`hover:bg-gray-200 font-light py-2 px-4 bg-gray-100 rounded-sm ${item === size ? 'border-yellow-500 border' : ''}`}
                      key={index}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button  onClick={()=>addToCart(productData._id, size)} className="bg-black text-white py-4 px-8 rounded-sm active:bg-gray-800 transition text-lg font-medium">Add to Cart</button>
              <hr />
            </div>
          </div>

          {/* Description and Reviews section */}
          <div className='mt-20'>
            <div className='flex'>
              <b className='border rounded-sm mr-1 px-5 py-3 text-sm'>Description</b>
              <p className='border rounded-sm px-5 py-3 text-sm'>Reviews (123)</p>
            </div>
            <div className='rounded-sm mt-1 flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>{productData.description}</p>
            </div>
          </div>
          {/* related products */}
          <RelatedProducts category={productData.category} season={productData.season} currentProductId={productData._id}/>
        </>
      ) : (
        <div className="text-center py-20 text-xl text-gray-500">Loading product...</div>
      )}
    </div>
  )
}

export default Product;

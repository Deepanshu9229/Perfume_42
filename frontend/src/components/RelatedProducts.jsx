import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

// is component ko product.jsx me attatch kiya hai, waha se 3 props send krna hai yaha reveive kiya hai - category nd season nd currentID(coz isko related me include nhi krna)
const RelatedProducts = ({ category, season, currentProductId }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
      // Always treat category and season as arrays for consistent comparison
      const currentCategories = Array.isArray(category) ? category : [category];
      const currentSeasons = Array.isArray(season) ? season : [season];

      const relatedProducts = products.filter((item) => {
        // Skip the current product itself
        if (item._id === currentProductId) return false;

        // Normalize item category and season
        const itemCategories = Array.isArray(item.category) ? item.category : [item.category];
        const itemSeasons = Array.isArray(item.season) ? item.season : [item.season];

        // Check if there’s at least one matching category and one matching season
        const categoryMatches = itemCategories.some((cat) => currentCategories.includes(cat));
        const seasonMatches = itemSeasons.some((s) => currentSeasons.includes(s));

        return categoryMatches && seasonMatches;
      });

      setRelated(relatedProducts.slice(0, 5));
    }
  }, [products, category, season, currentProductId]);


    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <h1>Related Products</h1>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image[0]} />
                ))}
            </div>

        </div>
    )
}

export default RelatedProducts
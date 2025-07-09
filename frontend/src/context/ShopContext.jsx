
//centralizing state for easy access ini child components
import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { products } from '../assets/assets'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContexProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate()

    //----------------add to cart
    const addToCart = async (itemId, size) => {

        if(!size){
            toast.error('Please Select Size')
            return;
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){ // if itemId already exists in cartData
            if(cartData[itemId][size]){ // if size with product also exist
                cartData[itemId][size] += 1; // add to cart
            } else cartData[itemId][size] = 1;
        } else {
            cartData[itemId] = {}; //Creates a new object to hold sizes for this product.
            cartData[itemId][size] = 1; //Sets the chosen size to a starting quantity of 1
        }       
        toast.success('Product added') 
        setCartItems(cartData); 
        // console.log(cartItems);
        
    }
    //---------------- number of item
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0) totalCount += cartItems[items][item];
                } catch (error) {
                    
                }
            }
        }
        return totalCount;

    }
    //-------------------- cart update (delete krne pe ya quantity inc.)
    const updateQuantity = (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            if(quantity > 0) cartData[itemId][size] = quantity; // update quantity
            else {
                delete cartData[itemId][size] // delete size
                if(Object.keys(cartData[itemId]).length === 0) delete cartData[itemId]  // if no sizes left, remove entire item
            }
        } 
        setCartItems(cartData)
    }
    //----------------------cart Value
    const getCartAmount = () => {
        let totalAmount = 0
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0) totalAmount += itemInfo.price * cartItems[items][item]
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }


    
    const value = { // these things can be accessed anywhere
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate
    };

  return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
  )
}

export default ShopContexProvider;
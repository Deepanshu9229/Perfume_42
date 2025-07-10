import React, { useState } from 'react'
import { assets } from '../assets/asset.js'

const Add = () => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [season, setSeason] = useState([])
    const [bestseller, setBestseller] = useState(false)
    const [size, setSize] = useState([])



  return (
    <form className='flex flex-col w-full items-start gap-6 p-6 max-w-4xl mx-auto'>
      {/* Upload Images Section */}
      <div className='w-full'>
        <p className='mb-3 text-lg font-semibold text-gray-700'>Upload Images</p>
        <div className='flex gap-4 flex-wrap'>

          <label htmlFor="image1" className='cursor-pointer'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors' src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="Upload 1" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden accept="image/*" />
          </label>
          <label htmlFor="image2" className='cursor-pointer'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors' src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="Upload 2" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden accept="image/*" />
          </label>
          <label htmlFor="image3" className='cursor-pointer'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors' src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="Upload 3" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden accept="image/*" />
          </label>

        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-3 text-lg font-semibold text-gray-700'>Product Name</p>
        <input className='w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg  ' type="text" placeholder='Enter Product Name' />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <p className='mb-3 text-lg font-semibold text-gray-700'>Product Description</p>
        <textarea className='w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg   resize-vertical min-h-[120px]' placeholder='Write description here'rows="4"/>
      </div>

      {/* Product Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
        
        {/* Product Category */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Category</p>
          <select className='w-full px-4 py-3 border border-gray-300 rounded-lg   bg-white'>
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Product Season - Multiple Selection */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Season</p>
          <div className='border border-gray-300 rounded-lg p-3 bg-white max-h-50 y-auto'>
            <div className='space-y-2'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="Summer" className='w-4 h-4 ' />
                <span className='text-gray-700'>Summer</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="Winter" className='w-4 h-4' />
                <span className='text-gray-700'>Winter</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="Spring" className='w-4 h-4' />
                <span className='text-gray-700'>Spring</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="Autumn" className='w-4 h-4 ' />
                <span className='text-gray-700'>Autumn</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="All-season" className='w-4 h-4 ' />
                <span className='text-gray-700'>All-season</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Price</p>
          <input className='w-full px-4 py-3 border border-gray-300 rounded-lg ' type="number" placeholder='100'min="0"step="0.01"/>
        </div>

        {/* Product Sizes - Multiple Selection */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Sizes</p>
          <div className='border border-gray-300 rounded-lg p-3 bg-white max-h-40 overflow-y-auto'>
            <div className='space-y-2'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="10ML" className='w-4 h-4' />
                <span className='text-gray-700'>10ML</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="50ML" className='w-4 h-4' />
                <span className='text-gray-700'>50ML</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" value="100ML" className='w-4 h-4' />
                <span className='text-gray-700'>100ML</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className='flex items-center gap-3 mt-2'>
        <input type="checkbox" id='bestSeller' className='w-5 h-5'/>
        <label className='cursor-pointer text-gray-700 font-medium' htmlFor="bestSeller">Add to best-seller</label>
      </div>

      {/* Submit Button */}
      <button type='submit' className='px-8 py-3 mt-6 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold text-lg'>Add Product</button>
    </form>
  )
}

export default Add
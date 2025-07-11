import React, { useState } from 'react'
import { assets } from '../assets/asset.js'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", JSON.stringify(category))
      formData.append("season", JSON.stringify(season))
      formData.append("size", JSON.stringify(size))
      formData.append("bestSeller", bestseller)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
      // console.log(response);

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription("")
        setPrice("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
      } else toast.error(response.data.message)
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
     }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6 p-6 max-w-4xl mx-auto'>
      {/* Upload Images Section */}
      <div className='w-full'>
        <p className='mb-3 text-lg font-semibold text-gray-700'>Upload Images</p>
        <div className='flex gap-4 flex-wrap'>

          <label htmlFor="image1" className='cursor-pointer'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors' src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="Upload 1" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden accept="image/*" />
          </label>
          <label htmlFor="image2" className='cursor-pointer'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors' src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="Upload 2" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden accept="image/*" />
          </label>
          <label htmlFor="image3" className='cursor-pointer'>
            <img className='w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors' src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="Upload 3" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden accept="image/*" />
          </label>

        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-3 text-lg font-semibold text-gray-700'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg  ' type="text" placeholder='Enter Product Name' />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <p className='mb-3 text-lg font-semibold text-gray-700'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg   resize-vertical min-h-[120px]' placeholder='Write description here' rows="4" />
      </div>

      {/* Product Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>

        {/* Product Category */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-4 py-3 border border-gray-300 rounded-lg   bg-white'>
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
                <input onChange={(e) => {setSeason(prev => prev.includes("Summer") ? prev.filter(item => item !== "Summer") : [...prev, "Summer"])}} type="checkbox" value="Summer" className='w-4 h-4 ' />
                <span className='text-gray-700'>Summer</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e) => {setSeason(prev => prev.includes("Winter") ? prev.filter(item => item !== "Winter") : [...prev, "Winter"]) }} type="checkbox" value="Winter" className='w-4 h-4' />
                <span className='text-gray-700'>Winter</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e) => {setSeason(prev => prev.includes("Spring") ? prev.filter(item => item !== "Spring") : [...prev, "Spring"])}} type="checkbox" value="Spring" className='w-4 h-4' />
                <span className='text-gray-700'>Spring</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e) => {setSeason(prev => prev.includes("Autumn") ? prev.filter(item => item !== "Autumn") : [...prev, "Autumn"])}} type="checkbox" value="Autumn" className='w-4 h-4 ' />
                <span className='text-gray-700'>Autumn</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e) => {setSeason(prev => prev.includes("All-season" ) ? prev.filter(item => item !== "All-season" ) : [...prev, "All-season" ])}} type="checkbox" value="All-season" className='w-4 h-4 ' />
                <span className='text-gray-700'>All-season</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-3 border border-gray-300 rounded-lg ' type="number" placeholder='100' min="0" step="0.01" />
        </div>

        {/* Product Sizes - Multiple Selection */}
        <div className='w-full'>
          <p className='mb-3 text-lg font-semibold text-gray-700'>Product Sizes</p>
          <div className='border border-gray-300 rounded-lg p-3 bg-white max-h-40 overflow-y-auto'>
            <div className='space-y-2'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e)=>{setSize(prev => prev.includes("10ML") ? prev.filter(item => item !== "10ML") : [...prev, "10ML"])}} type="checkbox" value="10ML" className='w-4 h-4' />
                <span className='text-gray-700'>10ML</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e)=>{setSize(prev => prev.includes("50ML") ? prev.filter(item => item !== "50ML") : [...prev, "50ML"])}} type="checkbox" value="50ML" className='w-4 h-4' />
                <span className='text-gray-700'>50ML</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input onChange={(e)=>{setSize(prev => prev.includes("100ML") ? prev.filter(item => item !== "100ML") : [...prev, "100ML"])}} type="checkbox" value="100ML" className='w-4 h-4' />
                <span className='text-gray-700'>100ML</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className='flex items-center gap-3 mt-2'>
        <input onChange={()=>setBestseller(!bestseller)} type="checkbox" id='bestSeller' className='w-5 h-5' />
        <label className='cursor-pointer text-gray-700 font-medium' htmlFor="bestSeller">Add to best-seller</label>
      </div>

      {/* Submit Button */}
      <button type='submit' className='px-8 py-3 mt-6 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold text-lg'>Add Product</button>
    </form>
  )
}

export default Add
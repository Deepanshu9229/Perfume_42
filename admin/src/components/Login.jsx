import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'



const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            // console.log(response);
            if(response.data.success) setToken(response.data.token)
            else toast.error(response.data.message)
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6"> Admin Panel </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Email Address </label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none" />
          </div>

          <button type="submit" className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition" > Login </button>

        </form>
      </div>
    </div>
  )
}

export default Login

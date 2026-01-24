import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function UserLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [userData , setuserData] = useState({})
    const {user, setUser} = React.useContext(UserDataContext)
    const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault()
  try{
    const emailValue = email.trim();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailValue)) {
            toast.error("Please enter a valid email address");
            return;
          }
      const userData = {
      email:email,
      password:password
    }
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , userData)
     if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem("token" ,data.token)
      navigate('/home')
    }
  }catch(error){
  const message =
         error.response?.data?.message || "Invalid email or password"
       toast.error(message);
  }finally{
    setEmail('')
    setPassword('')}
    // console.log(userData)
  }
  return (
    <>
      <div className='p-5 flex flex-col gap-3 h-screen'>
        <div>
          <h1 className='absolute top -5 left-5 text-4xl font-semibold'>Uber</h1>
          <img src='/user-login.png' className=' mx-auto mt-5'/>
          </div>
        <div>
          <form onSubmit={(e) =>{handleSubmit(e)}}>
            <h3 className='text-lg font-medium mb-1'>Email</h3>
            <input
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              required
              type='email'
              placeholder='Enter your email'
              className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

            <h3 className='text-lg font-medium mb-1'>Password</h3>
            <input
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
              type='password'
              placeholder='Enter your password'
              className='bg-gray-50 w-full mb-7 rounded-2xl  px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500 ' />
            
            <button className='bg-black text-white  font-semibold mb-5  rounded-xl  px-4 py-2 text-center w-full'>
              Login
            </button>
          </form>
          <p className='text-center'>
            New here? <Link to="/signup" className='text-blue-900 font-semibold'>Create new Account</Link>
          </p>
        
          <Link to="/captain-login" className='text-red-500 font-semibold my-3 flex justify-center'>
            Login as a captain ?
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserLogin

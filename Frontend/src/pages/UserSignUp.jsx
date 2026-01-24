import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'

function UserSignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  // const [userData, setuserData] = useState({})
  const navigate = useNavigate()
  const { user, setUser } = React.useContext(UserDataContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fName = firstname.trim();
    const lName = lastname.trim();
    if (fName.length < 3) {
      toast.error("First name must be at least 3 characters");
      return;
    }

    if (lName.length < 3) {
      toast.error("Last name must be at least 3 characters");
      return;
    }

    try {

      const newUser = {
        email: email,
        password: password,
        fullname: {
          firstname: fName,
          lastname: lName
        }
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem("token", data.token)
        navigate('/home')
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Plese fill details correctly"
      toast.error(message);
    } finally {
      setEmail('')
      setPassword('')
      setFirstname('')
      setLastname('')
    }
  }


  return (
    <div className='p-5 flex flex-col justify-between h-screen'>
      <div>
   <div>
          <h1 className='absolute top-5 left-5 text-4xl font-semibold'>Uber</h1>
          <img src='/user-login.png' className='w-32 ms-auto' />
        </div>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <h3 className='text-base font-medium mb-2'>Enter your name</h3>
          <div className='flex gap-4'>
            <input
              id="firstname"
              value={firstname}
              onChange={(e) => {
                const value = e.target.value
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFirstname(value)
                }
              }}
              required
              type='text'
              placeholder='Enter firstname'
               className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

            <input
              id="lastname"
              value={lastname}
              onChange={(e) => {
                const value = e.target.value
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setLastname(value)
                }
              }}
              required
              type='text'
              placeholder='Enter lastname'
               className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />
          </div>
          <h3 className='text-base font-medium mb-2'>Enter your email</h3>
          <input
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            required
            type='email'
            placeholder='Enter your email'
             className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

          <h3 className='text-base font-medium mb-2'>Enter password</h3>
          <input
            id="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required
            type='password'
            placeholder='Enter your password'
            className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

          <button className='bg-black text-white font-semibold mb-5 mt-2 rounded-xl px-4 py-2 text-center w-full'>
            Create account
          </button>
        </form>
        <p className='text-center'>
          Already have an Account? <Link to="/login" className='text-blue-500 font-semibold'> Login</Link>
        </p>
      </div>
      <div>
        {/* <p className='text-gray-600 text-xs leading-tight'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p> */}
      </div>
    </div>
  )
}

export default UserSignUp

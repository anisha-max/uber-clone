import React, { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function CaptainSignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  // const [captaianData, setcaptaianData] = useState({})

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const navigate = useNavigate()
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
    const captaianData = {
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captaianData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem("token", data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className='px-5 py-4 flex flex-col justify-between h-screen'>
      <div>
        <h1 className='text-4xl font-semibold mb-3'>Uber</h1>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <h3 className='text-base font-medium mb-2'>Enter your name</h3>
          <div className='flex gap-3'>
            <input
              id="firstname"
              value={firstname}
              onChange={(e) => { setFirstname(e.target.value) }}
              required
              type='text'
              placeholder='Enter firstname'
              className='bg-[#eeeeee] w-1/2 mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500' />

            <input
              id="lastname"
              value={lastname}
              onChange={(e) => { setLastname(e.target.value) }}
              required
              type='text'
              placeholder='Enter lastname'
              className='bg-[#eeeeee] w-1/2 mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500' />
          </div>
          <h3 className='text-base font-medium mb-2'>Enter your email</h3>
          <input
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            required
            type='email'
            placeholder='Enter your email'
            className='bg-[#eeeeee] w-full mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500' />

          <h3 className='text-base font-medium mb-2'>Enter password</h3>
          <input
            id="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required
            type='password'
            placeholder='Enter your password'
            className='bg-[#eeeeee] w-full mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500 ' />

          <h3 className='text-base font-medium mb-2'>Enter your name</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-x-3'>
            <input
              id="vehicleColor"
              value={vehicleColor}
              onChange={(e) => { setVehicleColor(e.target.value) }}
              required
              type='text'
              placeholder='vehicle color'
              className='bg-[#eeeeee]  mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500' />

            <input
              id="vehiclePlate"
              value={vehiclePlate}
              onChange={(e) => { setVehiclePlate(e.target.value) }}
              required
              type='text'
              placeholder='vehicle plate'
              className='bg-[#eeeeee]  mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500' />

            <input
              id="vehicleCapacity"
              value={vehicleCapacity}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*$/.test(value)) {
                  setVehicleCapacity(value)
                }
              }}
              required
              type='number'
              placeholder='vehicle capacity'
              className='bg-[#eeeeee]  mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500' />
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='bg-[#eeeeee]  mb-3 rounded px-4 py-2 border border-gray-200 text-base text-gray-700 placeholder:text-sm placeholder:text-gray-500'
            >
              <option value="" disabled>Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>

          </div>
          <button className='bg-black text-white font-semibold mb-2 rounded px-4 py-2 text-center w-full'>
            Sign up as Captain
          </button>
        </form>
        <p className='text-center'>
          Already have an Account? <Link to="/captain-login" className='text-blue-500 font-semibold'> Login</Link>
        </p>
      </div>
      <div>
        <p className='text-gray-600 text-[10px] leading-tight'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignUp

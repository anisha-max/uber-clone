import React, { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

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
    // Trim inputs
    const fName = firstname.trim();
    const lName = lastname.trim();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const vehicleCap = Number(vehicleCapacity);

    if (fName.length < 3) {
      toast.error("First name must be at least 3 characters");
      return;
    }

    if (lName.length < 3) {
      toast.error("Last name must be at least 3 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!vehicleColor.trim()) {
      toast.error("Vehicle color is required");
      return;
    }

    if (!vehiclePlate.trim()) {
      toast.error("Vehicle plate is required");
      return;
    }

    if (!vehicleCap || vehicleCap <= 0) {
      toast.error("Vehicle capacity must be greater than 0");
      return;
    }

    if (!vehicleType) {
      toast.error("Please select a vehicle type");
      return;
    }

    const captainData = {
      email: emailValue,
      password: passwordValue,
      fullname: {
        firstname: fName,
        lastname: lName
      },
      vehicle: {
        color: vehicleColor.trim(),
        plate: vehiclePlate.trim(),
        capacity: vehicleCap,
        vehicleType
      }
    };


    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem("token", data.token)
        toast.success("Registration successful ");
        navigate('/captain-home')
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Please fill all details correctly."
      toast.error(message);
    } finally {
      setEmail('')
      setPassword('')
      setFirstname('')
      setLastname('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    }
  }
  return (
    <div className='px-5 py-4 flex flex-col justify-between h-screen'>
      <div>
       <div>
          <h1 className='absolute top-5 left-5 text-4xl font-semibold'>Uber</h1>
          <img src='/user-login.png' className='w-32 ms-auto' />
        </div>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <h3 className='text-base font-medium mb-1'>Name</h3>
          <div className='flex gap-3'>
            <input
              id="firstname"
              value={firstname}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFirstname(value);
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
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setLastname(value)
                }
              }}
              required
              type='text'
              placeholder='Enter lastname'
              className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />
          </div>
          <h3 className='text-base font-medium mb-1'>Email</h3>
          <input
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            required
            type='email'
            placeholder='Enter your email'
            className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

          <h3 className='text-base font-medium mb-1'>Password</h3>
          <input
            id="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required
            type='password'
            placeholder='Enter your password'
            className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500 ' />

          <h3 className='text-base font-medium mb-1'>Vehicle details</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-x-3'>
            <input
              id="vehicleColor"
              value={vehicleColor}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setVehicleColor(value)
                }
              }}
              required
              type='text'
              placeholder='vehicle color'
              className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

            <input
              id="vehiclePlate"
              value={vehiclePlate}
              onChange={(e) => { setVehiclePlate(e.target.value) }}
              required
              type='text'
              placeholder='vehicle plate'
              className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

            <input
              id="vehicleCapacity"
              value={vehicleCapacity}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d?$/.test(value)) {
                  setVehicleCapacity(value);
                }
              }}
              required
              type='text'
              placeholder='vehicle capacity'
              className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='bg-gray-50 w-full mb-3 rounded-2xl px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500'
            >
              <option value="" disabled>Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>

          </div>
          <button className='bg-black text-white font-semibold my-2 rounded-xl px-4 py-2 text-center w-full'>
            Sign up as Captain
          </button>
        </form>
        <p className='text-center'>
          Already have an Account? <Link to="/captain-login" className='text-blue-500 font-semibold'> Login</Link>
        </p>
      </div>
      <div>
        {/* <p className='text-gray-600 text-[10px] leading-tight'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p> */}
      </div>
    </div>
  )
}

export default CaptainSignUp

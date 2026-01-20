import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import OTPInput from './OTPInput'

const ConfirmRidePopUp = ({ ride, setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            console.log(ride)
            setConfirmRidePopUpPanel(false)
            setRidePopUpPanel(false)
            navigate('/captain-riding', { state: { ride: ride } })
        }
    }

    return (
        <div className=' h-screen'>
            <button onClick={() => { setConfirmRidePopUpPanel(prev => !prev) }} className=' flex justify-center w-full py-3 mb-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold mb-4'>Confirm this ride to Start!</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex justify-between items-center w-full px-3 py-4 bg-gray-100 rounded-lg'>
                    <div className='flex justify-between items-center gap-4 '>
                        <img src='/uber.webp' className='w-10 h-10 rounded-full' />
                        <h3 className='text-base font-medium'>
                            {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
                        </h3>
                    </div>
                    <div>
                        <h3 className='text-xl font-medium'>2.2km</h3>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinIcon size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Lorem ipsim</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {ride?.pickup}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinCheckIcon size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Lorem ipsim</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {ride?.destination}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <Banknote size={22} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                                Cash
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mt-3 w-full'>
                    <form onSubmit={submitHandler}>
                        <div className='mb-3 w-fit mx-auto'>
                            <OTPInput length={6} onChange={setOtp} />
                        </div>
                        <button className='w-full bg-green-500 flex justify-center  font-semibold text-white rounded-lg py-2 px-4'>
                            Confirm
                        </button>
                        <button onClick={() => {
                            setConfirmRidePopUpPanel(prev => !prev)
                            setRidePopUpPanel(prev => !prev)
                        }} className=' w-full  mt-2 bg-red-500 font-semibold text-white rounded-lg py-2 px-4 '>
                            Cancle
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp

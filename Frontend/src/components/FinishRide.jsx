import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const FinishRide = ({ ride, setfinishRidePanel }) => {
    const navigate = useNavigate()
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            setfinishRidePanel(false)
            navigate('/captain-home')
        }
    }
    return (
        <div className=' h-[80vh]'>
            <button onClick={() => { setfinishRidePanel(false) }} className=' flex justify-center w-full py-3 mb-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold mb-4'>Finish this ride !</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex justify-between items-center w-full px-3 py-4 bg-gray-100 rounded-lg'>
                    <div className='flex justify-between items-center gap-4 '>
                        <img src='/uber.webp' className='w-10 h-10 rounded-full' />
                        <h3 className='text-base font-medium'>
                            {ride?.user.fullname.firstname}
                        </h3>
                    </div>
                    <div>
                        <h3 className='text-xl font-medium'>2.2km</h3>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='p-3 border-b-2 border-gray-200'>
                        <div className='flex items-center gap-2'>
                            <MapPinIcon size={16} className='' />
                            <h3 className='text-lg font-medium'>Pickup</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            {ride?.pickup}
                        </p>
                    </div>
                    <div className='p-3 border-b-2 border-gray-200'>
                        <div className='flex items-center gap-2'>
                            <MapPinCheckIcon size={16} className='' />
                            <h3 className='text-lg font-medium'>Destination</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            {ride?.destination}
                        </p>
                    </div>
                    <div className='p-3'>
                        <div className='flex items-center gap-2'>
                            <Banknote size={18} className='' />
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            Cash
                        </p>

                    </div>
                </div>
                <div className='mt-3 w-full'>
                    <button onClick={endRide} className='w-full bg-green-500 flex justify-center  font-semibold text-white rounded-lg py-2 px-4'>
                        Finish Ride
                    </button>
                    <p className='text-xs text-red-600 mt-6'>Click finish ride button if payment is completed.</p>
                </div>

            </div>
        </div>
    )
}

export default FinishRide

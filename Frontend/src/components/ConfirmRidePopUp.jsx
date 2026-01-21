import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
    const [distance, setDistance] = useState()
    const [time, setTime] = useState()
    useEffect(() => {
        if (!ride) return;

        const fetchDistanceTime = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
                    {
                        params: {
                            origin: ride.pickup,
                            destination: ride.destination,
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setDistance(response.data.distance.text)
                    setTime(response.data.duration.text)
                }
            } catch (error) {
                console.error("Error fetching distance/time:", error);
            }
        };


        fetchDistanceTime();
    }, [ride]);


    return (
        <div className=' h-[92vh]'>
            <button onClick={() => { setConfirmRidePopUpPanel(prev => !prev) }} className=' flex justify-center w-full py-1'>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold mb-4'>Confirm this ride to Start!</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex justify-between items-center w-full px-3 py-4 bg-gray-100 rounded-lg'>
                    <div className='flex justify-between items-center gap-4 '>
                        <img src='/uber.webp' className='w-12 h-12 rounded-full' />
                        <h3 className='text-base font-medium'>
                            {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
                        </h3>
                    </div>
                    <div>
                        <h3 className='text-lg font-medium'>{distance}</h3>
                        <p className='text-sm text-end'>{time}</p>
                    </div>
                </div>
                <div className='w-full '>
                    <div className=' p-3 border-b-2 border-gray-200'>
                        <div className='flex gap-2 items-center'>
                            <MapPinIcon size={14} className='' />
                            <h3 className='font-medium'>Pick up</h3>
                        </div>
                        <p className='text-gray-900 text-sm '>
                            {ride?.pickup}
                        </p>

                    </div>
                    <div className=' p-3 border-b-2 border-gray-200'>
                        <div className='flex gap-2 items-center'>
                                 <MapPinCheckIcon size={14} className='' />
                            <h3 className=' font-medium'>Destination</h3>
                        </div>
                            <p className='text-g9ay-600 text-sm'>
                                {ride?.destination}
                            </p>
                    </div>
                    <div className=' p-3'>
                        <div className='flex gap-2 items-center'>
                                 <Banknote size={16} className='' />
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                        </div>
                    </div>
                </div>
                <div className=' w-full'>
                    <form onSubmit={submitHandler}>
                        <div className='mb-3 w-fit mx-auto'>
                            <OTPInput length={6} onChange={setOtp} />
                        </div>
                        <button className='w-full bg-black flex justify-center  font-semibold text-white rounded-lg py-2 px-4'>
                            Confirm
                        </button>
                        <button onClick={() => {
                            setConfirmRidePopUpPanel(prev => !prev)
                            setRidePopUpPanel(prev => !prev)
                        }} className=' w-full  mt-2 bg-gray-300 font-semibold  rounded-lg py-2 px-4 '>
                            Cancle
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp

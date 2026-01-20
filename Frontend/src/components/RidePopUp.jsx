import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function RidePopUp({ ride, confirmRide, setRidePopUpPanel, setConfirmRidePopUpPanel }) {
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
        <div >
            <button onClick={() => { setRidePopUpPanel(prev => !prev) }} className=' flex justify-center w-full py-3 mb-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-4'>New Ride Available</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex justify-between items-center w-full px-3 py-4 bg-gray-100 rounded-lg'>
                    <div className='flex justify-between items-center gap-4 '>
                        <img src='/uber.webp' className='w-10 h-10 rounded-full' />
                        <h3 className='text-base font-medium'>
                            {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
                        </h3>
                    </div>
                    <div>
                        <h3 className='text-lg font-medium'>{distance}</h3>
                        <p className='font-gray-500 text-sm'>
                            {time}
                        </p>
                    </div>
                </div>
                <div className='w-full '>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinIcon size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {ride?.pickup}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinCheckIcon size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Destination</h3>
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
                <div className='flex  gap-2 justify-end items-center w-full'>
                    <button onClick={() => { setRidePopUpPanel(prev => !prev) }} className=' bg-gray-200 font-semibold text-gray-500 rounded-lg py-2 px-4 '>
                        Ignore
                    </button>
                    <button onClick={() => {
                        setConfirmRidePopUpPanel(prev => !prev)
                        confirmRide()
                    }} className=' bg-green-500 font-semibold text-white rounded-lg py-2 px-4'>
                        Accept
                    </button>

                </div>
            </div>
        </div>
    )
}

export default RidePopUp

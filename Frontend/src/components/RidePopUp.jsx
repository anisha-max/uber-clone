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
            <button onClick={() => { setRidePopUpPanel(prev => !prev) }} className='bg-gray-50 flex justify-center w-full py-1 mb-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-4'>New Ride Available</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex justify-between items-center w-full px-3 py-4 bg-gray-200 rounded-lg'>
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
                    <div className=' p-3 border-b-2 border-gray-200'>
                        <div >
                            <div className='flex gap-1 items-center mb-1'>
                                <MapPinIcon size={16} />
                                <h3 className='text-lg font-medium'>Pickup</h3>
                            </div>
                            <p className='text-gray-600   text-sm -mt-1'>
                                {ride?.pickup}
                            </p>
                        </div>
                    </div>
                    <div className=' p-3 border-b-2 border-gray-200'>
                        <div >
                            <div className='flex gap-1 items-center mb-1'>
                                <MapPinCheckIcon size={16} />
                                <h3 className='text-lg font-medium'>Destination</h3>
                            </div>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {ride?.destination}
                            </p>
                        </div>
                    </div>
                    <div className=' p-3'>
                        <div >
                            <div className='flex gap-1 items-center mb-1'>
                                <Banknote size={16}/>
                                <p className='text-gray-600   text-sm -mt-1'>
                                    Total Fare
                                </p>
                            </div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                        </div>
                    </div>
                </div>
                <div className='flex  gap-2 justify-end items-center w-full'>
                    <button onClick={() => { setRidePopUpPanel(prev => !prev) }} className=' bg-gray-200 font-semibold text-gray-500 rounded-lg py-2 px-4  hover:scale-105 hover:bg:bg-gray-300'>
                        Ignore
                    </button>
                    <button onClick={() => {
                        setConfirmRidePopUpPanel(prev => !prev)
                        confirmRide()
                    }} className=' bg-black font-semibold text-white rounded-lg py-2 px-4 hover:scale-105'>
                        Accept
                    </button>

                </div>
            </div>
        </div>
    )
}

export default RidePopUp

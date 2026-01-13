import { Banknote, ChevronDown, MapPinIcon } from 'lucide-react'
import React from 'react'

function ConfirmedRide({ createRide,pickup ,destination ,fare , vehicleType ,setVehicleFoundPanel, setConfirmedRidePanel }) {
    return (
        <div>
            <button onClick={() => { setConfirmedRidePanel(prev => !prev) }} className=' flex justify-center w-full py-3 mb-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-1'>Confirm your ride</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <img src="/car.webp" className='h-20' />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinIcon size={20} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Pick-up</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                               {pickup}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinIcon size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                              {destination}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <Banknote size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>₹{fare?.[vehicleType]}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                                Cash
                            </p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    createRide()
                    setVehicleFoundPanel(true)
                    setConfirmedRidePanel(false)
                }} className='w-full bg-green-500 font-semibold text-white rounded-lg p-2 mt-3'>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ConfirmedRide

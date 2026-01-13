import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React from 'react'

function LookingForDriver({ pickup, destination, fare, vehicleType, setVehicleFoundPanel }) {
    return (
        <div>
            <button onClick={() => { setVehicleFoundPanel(prev => !prev) }} className=' flex justify-center w-full pt-3 pb-2'>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-1'>Looking for a Driver</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <img src="/car.webp" className='h-20' />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinIcon size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>Pick-up</h3>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {pickup}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <MapPinCheckIcon size={18} className='' />
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
            </div>
        </div>
    )
}

export default LookingForDriver

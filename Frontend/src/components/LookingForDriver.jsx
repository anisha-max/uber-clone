import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React from 'react'

function LookingForDriver({ pickup, destination, fare, vehicleType, setVehicleFoundPanel }) {
    const vehicleImages = {
        car: "/car.webp",
        bike: "/bike.webp",
        auto: "/auto.webp",
    };
    return (
        <div>
            <button onClick={() => { setVehicleFoundPanel(prev => !prev) }} className=' flex justify-center w-full pt-3 pb-2'>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-1'>Looking for a Driver</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <img src={vehicleImages[vehicleType]} className='h-20' />
                <div className='w-full mt-5'>
                    <div className='p-3 border-b-2 border-gray-200'>
                        <div className='flex items-center gap-2 pb-1'>
                            <MapPinIcon size={16} className='' />
                            <h3 className='text-lg font-medium'>Pick-up</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            {pickup}
                        </p>
                    </div>
                    <div className='p-3 border-b-2 border-gray-200'>
                        <div className='flex items-center gap-2 pb-1'>
                            <MapPinCheckIcon size={16} className='' />
                            <h3 className='text-lg font-medium'>Destination</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            {destination}
                        </p>
                    </div>
                    <div className='p-3'>
                        <div className='flex items-center gap-2 pb-1'>
                            <Banknote size={18} className='' />
                            <h3 className='text-lg font-medium'>₹{fare?.[vehicleType]}</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            Cash
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver

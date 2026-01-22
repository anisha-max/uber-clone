import { Banknote, ChevronDown, MapPinIcon } from 'lucide-react'
import React from 'react'

function ConfirmedRide({ createRide, pickup, destination, fare, vehicleType, setVehicleFoundPanel, setConfirmedRidePanel }) {
    const vehicleImages = {
  car: "/car.webp",
  bike: "/bike.webp",
  auto: "/auto.webp",
};

    return (
        <div>
            <button onClick={() => { setConfirmedRidePanel(prev => !prev) }} className=' flex justify-center w-full py-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-1'>Confirm your ride</h3>
            <div className='flex flex-col justify-between items-center gap-2'>
                <img src={vehicleImages[vehicleType]} className='h-20' />
                <div className='w-full mt-2'>
                    <div className='  p-3 border-b-2 border-gray-200'>
                        <div className='flex items-center gap-2'>
                            <MapPinIcon size={16} className='' />
                            <h3 className='text-lg font-medium mb-1'>Pick-up</h3>
                        </div>
                        <p className='text-gray-600 text-sm -mt-1'>
                            {pickup}
                        </p>
                    </div>
              
                <div className='  p-3 border-b-2 border-gray-200'>
                    <div className='flex items-center gap-2'>
                        <MapPinIcon size={16} className='' />
                        <h3 className='text-lg font-medium mb-1'>Destination</h3>
                    </div>
                    <p className='text-gray-600 text-sm -mt-1'>
                        {destination}
                    </p>
                </div>
                <div className='  p-3'>
                    <div className='flex items-center gap-2'>
                        <Banknote size={18} className='' />
                        <h3 className='text-lg font-medium mb-1'>₹{fare?.[vehicleType]}</h3>
                    </div>
                    <p className='text-gray-600 text-sm -mt-1'>
                        Cash
                    </p>
                </div>
            </div>
            <button onClick={() => {
                createRide()
                setVehicleFoundPanel(true)
                setConfirmedRidePanel(false)
            }} className='w-full bg-black font-semibold text-white rounded-lg p-2 mt-3'>
                Confirm
            </button>
        </div>
        </div >
    )
}

export default ConfirmedRide

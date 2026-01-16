import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React from 'react'

function WaitingForDriver({ride ,setWaitingForDriverPanel}) {
  return (
     <div>
            <button onClick={() => { setWaitingForDriverPanel(prev => !prev) }} className=' flex justify-center w-full pt-3 pb-2'>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <div className='flex items-center justify-between'>
                 <img src="/car.webp" className='h-16' />
                 <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>
                        {ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}
                    </h2>
                    <h4 className='text-xl font-semibold -my-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='font-sm text-sm'>Maruti Alto</p>
                    <h1 className='text-xl font-semibold'>{ride?.otp}</h1>
                 </div>
            </div>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='w-full mt-5'>
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
                        <Banknote size={18} className='' />
                        <div >
                            <h3 className='text-lg font-medium'>{ride?.fare}</h3>
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

export default WaitingForDriver

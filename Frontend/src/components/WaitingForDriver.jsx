import { Banknote, ChevronDown, MapPinCheckIcon, MapPinIcon } from 'lucide-react'
import React from 'react'

function WaitingForDriver({ride ,setWaitingForDriverPanel}) {

  return (
     <div>
            <button onClick={() => { setWaitingForDriverPanel(prev => !prev) }} className=' flex justify-center w-full pt-3 pb-2'>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <div className='flex items-center justify-between'>
                <div>
                    <img src="/captain.png" className='h-16' />
                    <h2 className='text-sm capitalize'>
                        {ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}
                    </h2>
                </div>
                 <div className='text-right'>
                    <p className=' text-sm pe-1'>Vehc.no.</p>
                    <h4 className='text-lg font-semibold -my-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='font-sm text-sm'>OTP</p>
                    <h1 className='text-lg text-green-500 font-semibold'>{ride?.otp}</h1>
                 </div>
            </div>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='w-full mt-5'>
                    <div className=' p-3 border-b-2 border-gray-200'>
                  <div className='flex items-center gap-2 pb-1'>
                                              <MapPinIcon size={16} className='' />
                                              <h3 className='text-lg font-medium'>Pick-up</h3>
                                          </div>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {ride?.pickup}
                            </p>
                    </div>
                    <div className=' p-3 border-b-2 border-gray-200'>
                      <div className='flex items-center gap-2 pb-1'>
                                                <MapPinCheckIcon size={16} className='' />
                                                <h3 className='text-lg font-medium'>Destination</h3>
                                            </div>
                            <p className='text-gray-600 text-sm -mt-1'>
                                {ride?.destination}
                            </p>
                    </div>
                    <div className=' p-3'>
                    <div className='flex items-center gap-2 pb-1'>
                                              <Banknote size={18} className='' />
                                              <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
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

export default WaitingForDriver

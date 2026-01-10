import { Banknote, Home, MapPinCheckIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
function Riding() {
  return (
    <div className='h-screen'>
      <Link to="/home" className='fixed top-2 left-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <Home />
      </Link>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src='/uber.webp' />
      </div>
      <div className="h-1/2 p-4">
        <div className='flex items-center justify-between'>
          <img src="/car.webp" className='h-16' />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>
              Lorem
            </h2>
            <h4 className='text-xl font-semibold -my-1'>AP07 DB 2679</h4>
            <p className='font-sm text-sm'>Maruti Alto</p>
          </div>
        </div>
        <div className='flex flex-col justify-between items-center gap-2'>
          <div className='w-full mt-3'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
              <MapPinCheckIcon size={18} className='' />
              <div >
                <h3 className='text-lg font-medium'>Lorem ipsim</h3>
                <p className='text-gray-600 text-sm -mt-1'>
                  lorem ipsum some text
                </p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <Banknote size={18} className='' />
              <div >
                <h3 className='text-lg font-medium'>₹193.20</h3>
                <p className='text-gray-600 text-sm -mt-1'>
                  Cash
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full bg-green-500 font-semibold text-white rounded-lg p-2 mt-3'> Make payment</button>
      </div>
    </div>
  )
}

export default Riding

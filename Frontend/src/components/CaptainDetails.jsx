import { Banknote, CircleGauge, Clock } from 'lucide-react'
import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'



function CaptainDetails() {
  const { captain } = useContext(CaptainDataContext)

  // ⛔ BLOCK RENDER UNTIL DATA EXISTS
  if (
    !captain ||
    !captain.fullname ||
    !captain.fullname.firstname
  ) {
    return <div className="p-3">Loading...</div>
  }

  return (
    <>
      <div className='flex items-center justify-between p-1'>
        <div className='flex items-center justify-start gap-3'>
          <img src='/uber.webp' className='w-10 h-10 rounded-full object-cover' />
          <h4 className='text-lg font-medium capitalize'>
            {captain.fullname.firstname} {captain.fullname.lastname || ""}
          </h4>
        </div>

        <div>
          <h4 className='text-xl font-semibold'>₹195.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>

      <div className='flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-start my-3'>
        <div className='text-center'>
          <Clock className='mx-auto mb-2' size={28} strokeWidth={1.4} />
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours online</p>
        </div>

        <div className='text-center'>
          <CircleGauge className='mx-auto mb-2' size={26} strokeWidth={1.4} />
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours online</p>
        </div>

        <div className='text-center'>
          <Banknote className='mx-auto mb-2' size={30} strokeWidth={1.4} />
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours online</p>
        </div>
      </div>
    </>
  )
}


export default CaptainDetails

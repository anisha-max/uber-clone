import { Banknote, CircleGauge, Clock } from 'lucide-react'
import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'



function CaptainDetails() {
  const { captain } = useContext(CaptainDataContext)
  if (
    !captain ||
    !captain.fullname ||
    !captain.fullname.firstname
  ) {
    return <div className="p-3">Loading...</div>
  }

  return (
    <>

      <div className='flex items-center justify-between gap-3 mb-3'>
        <img src='/captain.png' className='w-14 h-14 rounded-full object-cover' />
        <div>
          <h4 className='text-lg font-medium text-end capitalize'>
            {captain.fullname.firstname} {captain.fullname.lastname || ""}
          </h4>
          <p className='text-sm'><span className='font-semibold'>Veh. no.</span>{captain.vehicle.plate}</p>
        </div>
      </div>


      <div className='flex py-4 px-3 bg-gray-200 rounded-xl justify-center gap-3 items-start mt-4'>
        <div className='text-center'>
          <Clock className='mx-auto mb-1' size={24} strokeWidth={1.4} />
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours online</p>
        </div>

        <div className='text-center'>
          <CircleGauge className='mx-auto mb-1' size={22} strokeWidth={1.4} />
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours online</p>
        </div>

        <div className='text-center'>
          <Banknote className='mx-auto mb-1' size={24} strokeWidth={1.4} />
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours online</p>
        </div>
      </div>
    </>
  )
}


export default CaptainDetails

import { User2 } from 'lucide-react';
import React from 'react'

function VehicleCard({ selectVehicle, name, img, title, seats, time, desc, price, setConfirmedRidePanel }) {
  return (
    <div onClick={() => {
      setConfirmedRidePanel(true)
      selectVehicle(name)
    }}
      className='flex p-3 items-center justify-between gap-2 active:border-3 rounded-xl mb-2' >
      <img className='w-22' src={img} />
      <div className='ml-2 w-1/2'>
        <h4 className='flex items-center gap-1 font-medium text-base'>
          {title}
          <span className='flex items-center gap-1 text-xs font-normal'>
            <User2 size={12} fill='black' />{seats}
          </span>
        </h4>
        <h5 className='text-sm text-gray-800'>{time}</h5>
        <p className='text-xs text-gray-600'>{desc}</p>
      </div>
      <h4 className='font-semibold text-lg'>₹{price}</h4>
    </div >
  );
}


export default VehicleCard

import { MapPinIcon } from 'lucide-react'
import React from 'react'

function LocationSearchPanel() {
  return (
    <div>
      <div className='flex items-center gap-2 my-3'>
        <MapPinIcon size={25} className='bg-[#eee] p-1 rounded-full'/>
        <p className='text-md'>
            Lorem ipsum is placeholder text 
        </p>
      </div>
    </div>
  )
}

export default LocationSearchPanel

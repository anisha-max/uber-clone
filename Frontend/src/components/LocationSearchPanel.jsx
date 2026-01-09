import { MapPinIcon } from 'lucide-react'
import React from 'react'

function LocationSearchPanel({setPanelOpen, setvehicalPanel}) {
  const locations = [
    " Abc 23 , near ksm plaza,my uber booking station ,Jaupur",
    " Abc 23 , near ksm plaza,my uber booking station ,Jaupur",
    " Abc 23 , near ksm plaza,my uber booking station ,Jaupur"]
  return (
    <div>
      {locations.map((location , index) => {
        return (
          <div onClick={()=>{
            setvehicalPanel(true)
            setPanelOpen(false)
          }} key={index}
          className='flex items-center rounded-xl gap-2 my-2 border-2 border-gray-50 active:border-black p-2'>
            <div className='bg-[#eee] rounded-full p-1'>
              <MapPinIcon size={18} className='' />
            </div>
            <p className='text-md'>
              {location}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel

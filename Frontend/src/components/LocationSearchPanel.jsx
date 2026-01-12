import { MapPinIcon } from 'lucide-react'
import React from 'react'

function LocationSearchPanel({
  suggestions,
  setPanelOpen,
  setvehicalPanel,
  setPickup,
  setDestination,
  activeField
}) {
  const handleSuggestionClick = (suggestion) => {
    const address = suggestion.description

    if (activeField === 'pickup') {
      setPickup(address)
    } else if (activeField === 'destination') {
      setDestination(address)
    }

    setvehicalPanel(true)
    setPanelOpen(false)
  }

  return (
    <div>
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(elem)}
          className='flex items-center rounded-xl gap-2 my-2 border-2 border-gray-50 active:border-black p-2'
        >
          <div className='bg-[#eee] rounded-full p-1'>
            <MapPinIcon size={18} />
          </div>
          <p className='text-md text-'>
            {elem.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel

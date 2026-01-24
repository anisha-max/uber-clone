import { MapPinIcon, Clock } from 'lucide-react'
import React from 'react'
import axios from 'axios'

function LocationSearchPanel({
  suggestions,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
  searchHistory = [] 
}) {
  
  const handleSuggestionClick = async (suggestion) => {
    const address = suggestion.description

    if (activeField === 'pickup') {
      setPickup(address)
    } else if (activeField === 'destination') {
      setDestination(address)
    }


    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users/save-suggestion`, {
        suggestion: {
          description: suggestion.description,
          place_id: suggestion.place_id || suggestion.placeId 
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    } catch (error) {
  const message =
                error.response?.data?.message || "Failed to save suggestion"
              toast.error(message);
    }

  }

  const displayList = suggestions.length > 0 ? suggestions : searchHistory

  return (
    <div className=' bg-white'>
      {displayList.map((elem, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(elem)}
          className='flex items-center cursor-pointer rounded-xl gap-2 my-2 border-2 border-gray-50 active:border-black p-2'
        >
          <div className='bg-gray-50 rounded-full p-1'>
            {suggestions.length > 0 ? <MapPinIcon size={18} /> : <Clock size={18} />}
          </div>
          <p className='text-md'>
            {elem.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
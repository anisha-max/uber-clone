import { ChevronUp, LogOut } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'
import { useRideCoordinates } from '../components/useRideCoordinates'
import getDistanceInMeters from '../utils/getDistanceInMeters'
import RouteMap from '../components/RouteMap'

const CaptainRiding = () => {
  const finishRidePanelRef = useRef(null)
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const [arrivedAtDestination, setArrivedAtDestination] = useState(false)
  const location = useLocation()
  const rideData = location.state?.ride
  const { pickupC, destinationC } = useRideCoordinates(rideData)


  useEffect(() => {
    if (!destinationC?.ltd || !destinationC?.lng) return

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const captainLat = pos.coords.latitude
        const captainLng = pos.coords.longitude

        const distance = getDistanceInMeters(
          captainLat,
          captainLng,
          destinationC.ltd,
          destinationC.lng
        )

        if (distance <= 15) {
          setArrivedAtDestination(true)
          navigator.geolocation.clearWatch(watchId)
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [destinationC])

  
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { transform: "translateY(0)" })
    } else {
      gsap.to(finishRidePanelRef.current, { transform: "translateY(100%)" })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className='text-4xl font-semibold mb-5'>Uber</h1>
        <Link to="/home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <LogOut />
        </Link>
      </div>

      <div className='h-4/5'>
       <RouteMap
          locationA={{
            lat: destinationC?.ltd,
            lng: destinationC?.lng,
          }}
          locationB={{
            lat: pickupC?.ltd,
            lng: pickupC?.lng,
          }}
          locationAIcon="/car.webp"
          locationBIcon="/user.png"
          height="85vh"
        />
        {/* <LiveTracking /> */}
      </div>

      <div
        className="h-1/5 bg-yellow-400 flex flex-col justify-center px-4"
        onClick={() => {
          if (!arrivedAtDestination) return
          setFinishRidePanel(true)
        }}
      >
        <button
          onClick={() => {
            if (!arrivedAtDestination) return
            setFinishRidePanel(prev => !prev)
          }}
          className="flex justify-center w-full py-3 mb-1"
        >
          <ChevronUp className='text-gray-400 w-40' />
        </button>

        <button
          disabled={!arrivedAtDestination}
          className={`font-semibold rounded-lg py-2 px-4 ${
            arrivedAtDestination
              ? "bg-green-500 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'
      >
        <FinishRide ride={rideData} setfinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding

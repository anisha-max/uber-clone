import { LogOut } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'
import RouteMap from '../components/RouteMap'
import { useRideCoordinates } from '../components/useRideCoordinates'


function CaptainHome() {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const ridePopUpPanelRef = useRef(null)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
  const [ride, setRide] = useState(null)
  const { pickupC } = useRideCoordinates(ride);
  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,


    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
    setIsNavigating(true)

  }

  useEffect(() => {
    if (!captain || !captain._id) return

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (!navigator.geolocation) return

      navigator.geolocation.getCurrentPosition(position => {
        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      })
    }

    updateLocation()
    const interval = setInterval(updateLocation, 10000)

    return () => clearInterval(interval)
  }, [captain, socket])

  socket.on('new-ride', (data) => {
    console.log(data)
    setRide(data)
    setRidePopUpPanel(true)
  })


  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePopUpPanel])
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [ridePopUpPanel])
  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className='text-4xl font-semibold mb-5'>Uber</h1>
        <Link to="/home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <LogOut />
        </Link>
      </div>
      <div className='h-3/5'>
        {ride ? <RouteMap
          locationA={{
            lat: captain?.location?.ltd,
            lng: captain?.location?.lng,
          }}
          locationB={{
            lat: pickupC?.ltd,
            lng: pickupC?.lng,
          }}
          locationAIcon="/car.webp"
          locationBIcon="/user.png"
        /> : <LiveTracking />}
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <RidePopUp ride={ride} confirmRide={confirmRide} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <ConfirmRidePopUp ride={ride} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome

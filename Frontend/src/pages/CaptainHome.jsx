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
import { toast } from 'react-toastify'
import getDistanceInMeters from '../utils/getDistanceInMeters'


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
  const [rideMap, setRideMap] = useState(false)
  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      setRideMap(true);
      setRidePopUpPanel(false);
      toast.success("Ride confirmed. Navigate to pickup.");
    }
  }
  useEffect(() => {
    if (!ride || !pickupC || confirmRidePopUpPanel) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const captainLat = pos.coords.latitude;
        const captainLng = pos.coords.longitude;

        const distance = getDistanceInMeters(
          captainLat,
          captainLng,
          pickupC.ltd,
          pickupC.lng
        );

        if (distance <= 15) {
          setConfirmRidePopUpPanel(true);
          toast.success("You have arrived at pickup");
          navigator.geolocation.clearWatch(watchId);
        }
      },
      null,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [ride, pickupC, confirmRidePopUpPanel]);



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

  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      setRide(data);
      setRidePopUpPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);


  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, { bottom: 0 })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, { bottom: "-100%" })
    }
  }, [confirmRidePopUpPanel])
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, { bottom: 0 })
    } else {
      gsap.to(ridePopUpPanelRef.current, { bottom: "-100%" })
    }
  }, [ridePopUpPanel])
  return (
    <div className='h-screen'>
      <div className='h-3/5'>
        {rideMap  ? <RouteMap
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
          height="60vh"
        /> : <LiveTracking />}
        {/* <LiveTracking /> */}
      </div>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className='text-4xl font-semibold mb-5'>Uber</h1>
        <Link to="/captain-logout" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <LogOut />
        </Link>
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed z-10  -bottom-full  bg-white px-3 pb-8 w-full'>
        <RidePopUp ride={ride} confirmRide={confirmRide} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed z-10  -bottom-full  bg-white px-3 pb-8 w-full'>
        <ConfirmRidePopUp ride={ride} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome

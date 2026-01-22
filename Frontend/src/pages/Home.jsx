import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { ArrowDown, ChevronDown, ChevronUp, User2 } from 'lucide-react'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { useContext } from 'react'
import { useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import RouteMap from '../components/RouteMap'
import { useRideCoordinates } from '../components/useRideCoordinates'

function Home() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const vehicalPanelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const ConfirmedRidePanelRef = useRef(null)
  const [vehicalPanel, setvehicalPanel] = useState(false)
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const { pickupC, destinationC, loading, error } = useRideCoordinates(ride);

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  useEffect(() => {
    if (!user) return

    socket.emit("join", { userType: "user", userId: user._id })

    const updateLocation = () => {
      if (!navigator.geolocation) return

      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setLatitude(lat)
        setLongitude(lng)

        socket.emit('update-location-user', {
          userId: user._id,
          location: {
            ltd: lat,
            lng: lng,
          },
        })
      })
    }

    updateLocation()
    const interval = setInterval(updateLocation, 10000)

    return () => clearInterval(interval)
  }, [user, socket])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSearchHistory(response.data.searchHistory || [])
      } catch (err) {
        console.error("Error fetching history", err)
      }
    }
    fetchHistory()
  }, [])

  socket.on('ride-confirmed', ride => {
    setWaitingForDriverPanel(true)
    setVehicleFoundPanel(false)
    setRide(ride)
    console.log(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriverPanel(false)
    navigate('/riding', { state: { ride: ride } })
  })

  const handlePickupChange = async (e) => {
    const value = e.target.value
    setPickup(value)
    setPanelOpen(true)
    setActiveField('pickup')
    if (!value.trim()) {
      setPickupSuggestions([])
      return
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value, ltd: latitude, lng: longitude },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setPickupSuggestions(response.data.predictions)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDestinationChange = async (e) => {
    const value = e.target.value
    setDestination(value)
    setPanelOpen(true)
    setActiveField('destination')

    if (!value.trim()) {
      setDestinationSuggestions([])
      return
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value, ltd: latitude, lng: longitude },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setDestinationSuggestions(response.data.predictions)
    } catch (error) {
      console.error(error)
    }
  }


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '50%'
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
    }
  }, [panelOpen])
  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (vehicalPanel) {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicalPanel])


  useGSAP(() => {
    if (vehicleFoundPanel) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleFoundPanel])

  useGSAP(() => {
    if (ConfirmedRidePanel) {
      gsap.to(ConfirmedRidePanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(ConfirmedRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [ConfirmedRidePanel])

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForDriverPanel])

  async function findTrip() {
    setvehicalPanel(true)
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    setFare(response.data)

  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }


  return (
    <div className='h-screen relative overflow-hidden'>
      <div className='absolute top-5 left-5'>
        <h1 className='text-4xl font-semibold mb-5'>Uber</h1>
      </div>
      <div className='h-[60vh]'>
        {/* {ride ? <RouteMap
          locationA={{
            lat: ride?.captain?.location?.ltd,
            lng: ride?.captain?.location?.lng,
          }}
          locationB={{
            lat: pickupC?.ltd,
            lng: pickupC?.lng,
          }}
          locationAIcon="/car.webp"
          locationBIcon="/user.png"
          height={"60vh"}
        /> : <LiveTracking />} */}
        <LiveTracking />
      </div>
      <div className='h-screen flex flex-col justify-end absolute top-0 w-full '>
        <div className='h-[40vh] bg-white p-6 relative'>
          <button onClick={() => { setPanelOpen(prev => !prev) }} className='absolute top-3 right-3'>
            {panelOpen ? <ChevronDown /> : <ChevronUp />}
          </button>
          <h4 className='text-2xl font-semibold'>
            Find a trip
          </h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-600 rounded-full" />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Add a pick-up location' />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-3 '
              type='text'
              placeholder='Enter your destination' />
          </form>
          <button className=' w-full bg-black mt-5 font-semibold text-white rounded-lg py-2 px-4'
            onClick={() => {
              findTrip()
            }}>
            Find ride
          </button>
        </div>
        <div className=' bg-white overflow-scroll' ref={panelRef}>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            searchHistory={searchHistory}
            setvehicalPanel={setvehicalPanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehicalPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmedRidePanel={setConfirmedRidePanel} setvehicalPanel={setvehicalPanel} />
      </div>
      <div ref={ConfirmedRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <ConfirmedRide pickup={pickup} destination={destination} createRide={createRide} fare={fare} vehicleType={vehicleType} setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>
      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <LookingForDriver fare={fare} pickup={pickup} destination={destination} vehicleType={vehicleType} setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0  bg-white px-3 pb-8 w-full'>
        <WaitingForDriver ride={ride} setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home

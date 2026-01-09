import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { ArrowDown, ChevronDown, ChevronUp, User2 } from 'lucide-react'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

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
  const [ConfirmedRidePanel ,setConfirmedRidePanel] =useState(false)
  const [vehicleFoundPanel ,setVehicleFoundPanel] =useState(false)
  const [waitingForDriverPanel ,setWaitingForDriverPanel] =useState(false)



  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
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

  return (
    <div className='h-screen relative overflow-hidden'>
      <div className='absolute top-5 left-5'>
        <h1 className='text-4xl font-semibold mb-5'>Uber</h1>
      </div>
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='/uber.webp' />
      </div>
      <div className='h-screen flex flex-col justify-end absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-6 relative'>
          <button onClick={() => { setPanelOpen(prev => !prev) }} className='absolute top-3 right-3'>
            {panelOpen ? <ChevronDown /> : <ChevronUp />}
          </button>
          <h4 className='text-2xl font-semibold'>
            Find a trip
          </h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-600 rounded-full" />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => { setPickup(e.target.value) }}
              className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Add a pick-up location' />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => { setDestination(e.target.value) }}
              className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter your destination' />
          </form>
        </div>
        <div className='px-6 bg-white ' ref={panelRef}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} vehicalPanel={vehicalPanel} setvehicalPanel={setvehicalPanel} />
        </div>
      </div>
      <div ref={vehicalPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setvehicalPanel={setvehicalPanel} />
      </div>
      <div ref={ConfirmedRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <ConfirmedRide setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFoundPanel={setVehicleFoundPanel}/>
      </div>
       <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <LookingForDriver setVehicleFoundPanel={setVehicleFoundPanel}/>
      </div>
        <div ref={waitingForDriverRef} className='fixed z-10 bottom-0  bg-white px-3 pb-8 w-full'>
        <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}/>
      </div>
    </div>
  )
}

export default Home

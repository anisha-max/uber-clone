import { LogOut } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

function CaptainHome() {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const ridePopUpPanelRef = useRef(null)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)
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
        <img className='h-full w-full object-cover' src='/uber.webp' />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome

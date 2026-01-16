import { ChevronUp, LogOut } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {
    const finishRidePanelRef = useRef(null)
    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(0)"
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(100%)"
            })
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
                <img className='h-full w-full object-cover' src='/uber.webp' />
            </div>
            <div className="h-1/5   bg-yellow-400" onClick={() => {
                setfinishRidePanel(true)
            }}>
                <button onClick={() => { setfinishRidePanel(prev => !prev) }} className=' flex justify-center w-full py-3 mb-1 '>
                    <ChevronUp className='text-gray-400 w-40' />
                </button>
                <div className='flex items-center justify-between px-4'>
                    <h4 className='text-xl font-semibold'>
                        4 KM away
                    </h4>
                    <button className=' bg-green-500 font-semibold text-white rounded-lg py-2 px-4'>
                        Complete Ride
                    </button>
                </div>
            </div>
            <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 pb-8 w-full'>
                <FinishRide ride={rideData} setfinishRidePanel={setfinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding

import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { ArrowDown, ChevronDown, ChevronUp, User2 } from 'lucide-react'
import LocationSearchPanel from '../components/LocationSearchPanel'

function Home() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
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
          <LocationSearchPanel />
        </div>
      </div>
      <div className='fixed z-10 bottom-0 bg-white px-3 py-8 w-full'>
        <h2 className='text-2xl font-semibold px-3 mb-1'>Choose a vehicle</h2>
        <div className='flex p-3 items-center justify-between gap-2 active:border-3 rounded-xl mb-2'>
          <img className='w-22 ' src='/car.webp' />
          <div className='ml-2 w-1/2'>
            <h4 className='flex items-center gap-1 font-medium text-base'>
              Uber Go <span className='flex items-center gap-1 text-xs font-normal'><User2 size={12} fill='black' />4</span>
            </h4>
            <h5 className='text-sm text-gray-800'>
              2 min away
            </h5>
            <p className='text-xs text-gray-600'>
              Affordable , compact ride
            </p>
          </div>
          <h4 className='font-semibold text-lg'>₹193.20</h4>
        </div>
           <div className='flex p-3 items-center justify-between gap-2 active:border-3 rounded-xl mb-2'>
          <img className='w-22 ' src='/bike.webp' />
          <div className='ml-2 w-1/2'>
            <h4 className='flex items-center gap-1 font-medium text-base'>
              Moto <span className='flex items-center gap-1 text-xs font-normal'><User2 size={12} fill='black' />1</span>
            </h4>
            <h5 className='text-sm text-gray-800'>
              2 min away
            </h5>
            <p className='text-xs text-gray-600'>
              Affordable , motercycle ride
            </p>
          </div>
          <h4 className='font-semibold text-lg'>₹65.20</h4>
        </div>
           <div className='flex p-3 items-center justify-between gap-2 active:border-3 rounded-xl mb-2'>
          <img className='w-22 ' src='/auto.webp' />
          <div className='ml-2 w-1/2'>
            <h4 className='flex items-center gap-1 font-medium text-base'>
              Moto <span className='flex items-center gap-1 text-xs font-normal'><User2 size={12} fill='black' />3</span>
            </h4>
            <h5 className='text-sm text-gray-800'>
              3 min away
            </h5>
            <p className='text-xs text-gray-600'>
              Affordable , auto ride
            </p>
          </div>
          <h4 className='font-semibold text-lg'>118.20</h4>
        </div>
      </div>
    </div>
  )
}

export default Home

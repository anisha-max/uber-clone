import { Banknote, Home, MapPinCheckIcon } from 'lucide-react'
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {SocketContext} from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'
import { useRideCoordinates } from '../components/useRideCoordinates'
import RouteMap from '../components/RouteMap'


function Riding() {
  const location = useLocation()
  const ride =location.state?.ride  || {}
  const {socket} = useContext(SocketContext)
  const navigate = useNavigate()

     const { pickupC, destinationC, loading, error } = useRideCoordinates(ride);
  socket.on("ride-ended" ,()=>{
    navigate('/home')
  })
  return (
    <div className='h-screen'>
      <Link to="/home" className='fixed top-2 left-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <Home />
      </Link>
      <div className='h-1/2'>
      {ride ? <RouteMap
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
        /> : <LiveTracking />}
      </div>
      <div className="h-1/2 p-4">
        <div className='flex items-center justify-between'>
          <img src="/car.webp" className='h-16' />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className='text-xl font-semibold -my-1'>{ride?.captain.vehicle.plate}</h4>
            <p className='font-sm text-sm'>Maruti Alto</p>
          </div>
        </div>
        <div className='flex flex-col justify-between items-center gap-2'>
          <div className='w-full mt-3'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
              <MapPinCheckIcon size={18} className='' />
              <div >
                <h3 className='text-lg font-medium'>Destination</h3>
                <p className='text-gray-600 text-sm -mt-1'>
                 {ride?.destination}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <Banknote size={18} className='' />
              <div >
                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                <p className='text-gray-600 text-sm -mt-1'>
                  Cash
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full bg-green-500 font-semibold text-white rounded-lg p-2 mt-3'> Make payment</button>
      </div>
    </div>
  )
}

export default Riding

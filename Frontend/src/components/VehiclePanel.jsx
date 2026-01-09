import { ChevronDown } from 'lucide-react'
import React from 'react'
import VehicleCard from './VehicleCard';

function VehiclePanel({ setvehicalPanel ,setConfirmedRidePanel }) {
    const rides = [
        {
            id: 1,
            img: "/car.webp",
            title: "Uber Go",
            seats: 4,
            time: "2 min away",
            desc: "Affordable , compact ride",
            price: "₹193.20",
        },
        {
            id: 2,
            img: "/bike.webp",
            title: "Moto",
            seats: 1,
            time: "2 min away",
            desc: "Affordable , motercycle ride",
            price: "₹65.20",
        },
        {
            id: 3,
            img: "/auto.webp",
            title: "Auto",
            seats: 3,
            time: "3 min away",
            desc: "Affordable , auto ride",
            price: "₹118.20",
        },
    ];

    return (
        <>
            <button onClick={() => { setvehicalPanel(prev => !prev) }} className=' flex justify-center w-full py-3 mb-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-1'>Choose a vehicle</h3>
            {rides.map((ride) => (
                <VehicleCard setConfirmedRidePanel={setConfirmedRidePanel} key={ride.id} {...ride} />
            ))}

        </>
    )
}

export default VehiclePanel

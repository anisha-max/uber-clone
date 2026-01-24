import { ChevronDown } from 'lucide-react'
import React from 'react'
import VehicleCard from './VehicleCard';

function VehiclePanel({ fare , selectVehicle ,setvehicalPanel ,setConfirmedRidePanel }) {
    const rides = [
        {
            id: 1,
            name:"car",
            img: "/car.webp",
            title: "Uber Go",
            seats: 4,
            time: "2 min away",
            desc: "Affordable , compact ride",
            price: fare?.car,
        },
        {
            id: 2,
             name:"bike",
            img: "/bike.webp",
            title: "Moto",
            seats: 1,
            time: "2 min away",
            desc: "Affordable , motercycle ride",
            price: fare?.bike,
        },
        {
            id: 3,
             name:"auto",
            img: "/auto.webp",
            title: "Auto",
            seats: 3,
            time: "3 min away",
            desc: "Affordable , auto ride",
            price: fare?.auto,
        },
    ];

    return (
        <>
            <button onClick={() => { setvehicalPanel(prev => !prev) }} className='bg-gray-50 flex justify-center w-full pt-1 '>
                <ChevronDown className='text-gray-400 w-40' />
            </button>
            <h3 className='text-2xl font-semibold px-3 mb-1'>Choose a vehicle</h3>
            {rides.map((ride) => (
                <VehicleCard selectVehicle={selectVehicle} setvehicalPanel={setvehicalPanel} setConfirmedRidePanel={setConfirmedRidePanel} key={ride.id} {...ride} />
            ))}

        </>
    )
}

export default VehiclePanel

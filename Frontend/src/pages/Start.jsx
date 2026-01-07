import React from 'react'
import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'

function Start() {
  return (
    <div className='h-screen w-full flex justify-between flex-col bg-[url("/uber.webp")] bg-cover bg-center'  >
  <h1 className='text-4xl font-semibold mt-5 ms-3'>Uber</h1>
     <div className='bg-white p-4'>
      <h3 className='text-2xl mb-5 font-bold'>
        Get started with Uber
      </h3>
      <Link to="/login" className='bg-black text-white font-semibold w-full px-3 py-3 text-center rounded-lg flex justify-between items-center'>
         <span className='text-md'>Continue</span>
         <ArrowRight size={20}/>
        </Link>
     </div>
    </div>
  )
}

export default Start

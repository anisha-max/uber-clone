import React from 'react'
import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'

function Start() {
  return (
    <div className='h-screen w-full flex justify-between flex-col bg-[url("/start-page.jpg")] bg-cover bg-center'  >
<div className='mx-auto text-center'>
    <h1 className='text-9xl  font-semibold mt-5  text-white uppercase'>Uber</h1>
  <h3 className='text-xl text-white '>Anytime Anywhere Affordable</h3>
</div>
     <div className='bg-white py-6 lg:py-10 px-5'>
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

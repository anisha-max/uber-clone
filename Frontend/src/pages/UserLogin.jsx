import { useState } from 'react'
import { Link } from 'react-router-dom'

function UserLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData , setuserData] = useState({})
  const handleSubmit = (e)=>{
    e.preventDefault()
    setuserData({
      email:email,
      password:password
    })
    setEmail('')
    setPassword('')
    // console.log(userData)
  }
  return (
    <>
      <div className='p-7 flex flex-col justify-between h-screen'>
        <div>
          <h1 className='text-4xl font-semibold mb-5'>Uber</h1>
          <form onSubmit={(e) =>{handleSubmit(e)}}>
            <h3 className='text-lg font-medium mb-2'>What your email</h3>
            <input
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              required
              type='email'
              placeholder='Enter your email'
              className='bg-[#eeeeee] w-full mb-5 rounded px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500' />

            <h3 className='text-lg font-medium mb-2'>Enter password</h3>
            <input
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
              type='password'
              placeholder='Enter your password'
              className='bg-[#eeeeee] w-full mb-7 rounded px-4 py-2 border border-gray-200 text-lg text-gray-700 placeholder:text-base placeholder:text-gray-500 ' />
            
            <button className='bg-black text-white font-semibold mb-5 rounded px-4 py-2 text-center w-full'>
              Login
            </button>
          </form>
          <p className='text-center'>
            New here? <Link to="/signup" className='text-blue-500 font-semibold'>Create new Account</Link>
          </p>
        </div>
        <div>
          <Link to="/captain-login" className='bg-green-400 text-white font-semibold mb-5 rounded px-4 py-2 w-full flex items-center justify-center'>
            Login as a captain
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserLogin

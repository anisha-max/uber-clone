import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

function UserProtectedWrapper({ children }) {
  const navigate = useNavigate()
 const [isLoading, setIsLoading] = useState(true)

  const { setUser } = useContext(UserDataContext)
 const token = localStorage.getItem("token")
  useEffect(() => {
   

    if (!token) {
      navigate("/login")
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response.status === 200) {
          setUser(response.data)
          setIsLoading(false)
        }
      } catch (err) {
        // console.log(err)
        localStorage.removeItem("token")
        navigate("/login")
      }
    }

    fetchProfile()
  }, [navigate, setUser])

  if (isLoading) {
    return <>Loading...</>
  }


  return <>{children}</>
}

export default UserProtectedWrapper

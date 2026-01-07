import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const { captain, setCaptain } = useContext(CaptainDataContext)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/captain-login")
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response.status === 200) {
          setCaptain(response.data.captain)
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err)
        localStorage.removeItem("token")
        navigate("/captain-login")
      }
    }

    fetchProfile()
  }, [navigate, setCaptain])

  if (isLoading) {
    return <>Loading...</>
  }

  return <>{children}</>
}

export default CaptainProtectedWrapper

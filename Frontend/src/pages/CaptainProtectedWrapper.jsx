import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setIsLoading(false)
      navigate("/captain-login")
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log("PROFILE RESPONSE:", response.data)

        // 🔑 SAFE assignment (THIS LINE MATTERS MOST)
        setCaptain(response.data.captain || response.data)

      } catch (err) {
        console.log("PROFILE ERROR:", err)
        localStorage.removeItem("token")
        navigate("/captain-login")
      } finally {
        // 🔒 ALWAYS stop loading
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // 🔐 HARD BLOCK
  if (isLoading || !captain) {
    return <>Loading...</>
  }

  return children
}


export default CaptainProtectedWrapper

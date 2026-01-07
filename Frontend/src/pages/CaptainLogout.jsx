import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function CaptainLogout() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout` , {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token')
            console.log(token)
            navigate('/captain-login')
        }
    })
  return (
    <>
     <div> Captain logout</div>
    </>
  )
}

export default CaptainLogout

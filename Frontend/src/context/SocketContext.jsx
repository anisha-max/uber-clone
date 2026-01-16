import { createContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext(null)

    const socket = io(import.meta.env.VITE_BASE_URL)

    
const SocketProvider = ({ children }) => {
  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    // socketRef.current.on('connect_error', (err) => {
    //   console.error('Socket connect error:', err.message)
    // })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

//   const sendMessage = (event, message) => {
//     // console.log(`Swnding message ${message}`)
//     socketRef.current.emit(event, message)
//   }

//   const receiveMessage = (event, callback) => {
//     socketRef.current.off(event)
//     socketRef.current.on(event, callback)
//   }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider

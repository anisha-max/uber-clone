import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Home from './pages/Home'
import { useContext } from 'react'
import { UserDataContext } from './context/UserContext'

function App() {
  const data = useContext(UserDataContext)
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/signup' element={<UserSignUp/>} />
          <Route path='/captain-login' element={<CaptainLogin/>} />
          <Route path='/captain-signup' element={<CaptainSignUp/>} />
        </Routes>
      </div>
    </>
  )
}

export default App

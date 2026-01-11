import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Home from './pages/Home'
import { useContext } from 'react'
import { UserDataContext } from './context/UserContext'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

function App() {
  const data = useContext(UserDataContext)
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/home' element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/user-logout' element={<UserProtectedWrapper><UserLogout /></UserProtectedWrapper>} />
          <Route path='/captain-home' element={<CaptainHome />} />
          <Route path='/captain-login' element={<CaptainLogin />} />
          <Route path='/captain-signup' element={<CaptainSignUp />} />
          <Route path='/captain-riding' element={<CaptainRiding />} />
          <Route path='/captain-logout' element={<CaptainProtectedWrapper><CaptainLogout /></CaptainProtectedWrapper>} />
          <Route path='/riding' element={<UserProtectedWrapper><Riding /></UserProtectedWrapper>} />
        </Routes>
      </div>
    </>
  )
}

export default App

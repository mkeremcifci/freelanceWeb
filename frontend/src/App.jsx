import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Private from './pages/Private'
import SearchResults from './pages/SearchResults'
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswordVerify from './pages/ResetPasswordVerify'


function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={
            <Private>
              <Profile /> 
            </Private>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/results' element={<SearchResults />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password-verify' element={<ResetPasswordVerify />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App

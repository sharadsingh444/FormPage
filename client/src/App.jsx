
import FormPage from './formPage'
import Home from './home'
import React,{ useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hom from './home2'
import OTPpage from './OTPpage'
import Forgetpassword from './forgetpassword'

const App = () => {
  // const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/verifyOTP" element={<OTPpage/>}   />
          <Route path="/forgetpassword" element={<Forgetpassword/> }/>
          
          <Route path="/" element={<Home/>} />
          <Route path="/home2" element={<Hom />} />
          <Route path="/formpage" element={<FormPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
    
}

export default App
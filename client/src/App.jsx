
import FormPage from './formPage'
import Home from './home'
import React,{ useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  // const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/formpage" element={<FormPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
    
}

export default App
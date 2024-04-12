// src/App.js

import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
const  Resetpassword =()=> {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email,setEmail]=useState('');
    const location =useLocation();
    useEffect(()=>{
       if(location?.state?.email){
        setEmail(location.state.email);
        console.log(location.state.email);
       }
    },[])
    const handleSubmit = async (e) => {
        console.log(email)
        e.preventDefault();
        if (newPassword !== confirmPassword) {
          setMessage("Passwords don't match");
          return;
        }
    
        try {
          const response = await axios.post('http://localhost:8080/change-password', {
            email: email,
            newPassword: newPassword,
          });
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error:', error);
          setMessage(error.message);
        }
      };

    return (
        <div className='w-[100%] h-[100vh] bg-slate-200 flex justify-center items-center'>
            <div className='w-[80%] h-[70%] flex justify-center items-center  flex-col bg-slate-500'>
                <div>
                    <h1 className='flex justify-center items-center m-3'>Change Password</h1>
                </div>
                <div >
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newPassword">New Password:</label><br />
                        <input className='block border rounded-lg' type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
                        <label htmlFor="confirmPassword">Confirm New Password:</label><br />
                        <input className='block border rounded-lg' type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                        <button className='bg-green-500 ' type="submit">Submit</button>
                    </form>
                    <div className='text-red-700 font-bold'>
                        {message && <p>{message}</p>}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Resetpassword;

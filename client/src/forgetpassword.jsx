import React, { useState } from 'react'
import axios from 'axios';
import OTPpage from './OTPpage';
import { Link } from 'react-router-dom';

const Forgetpassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isExist, setIsExist] = useState(false);
    const [otp, setOtp] = useState('')
    
    const generateOTP = async () => {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        return OTP.toString();
    }

    const handleOTP = async () => {

        try {
            const newOTP = await generateOTP();

            await axios.post('http://localhost:8080/sendotp', { otp: newOTP, email: email });

            console.log(newOTP);
            setOtp(newOTP)
            // console.log(otp);
            console.log('OTP sent successfully');

            
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/forgetcheck', { email: email });
            if (response.status === 200) {
                setIsExist('');
                setIsExist(true);
                handleOTP();
                console.log(first);


            }

        } catch (error) {
            setMessage('Invalid Email');

        }


    };
    return (
        <div className='bg-gray-100 w-[100%] h-[100vh] flex justify-center items-center '>
            { isExist 
            ?
            <OTPpage otp={otp} setOtp={setOtp} email={email} resendFunction={handleOTP}/>
            :

            <div className='bg-blue-100 w-[50%] h-[50%] p-1'>
                <div className='flex justify-center items-center m-2'>
                    <h2>Forgot Password</h2>
                </div>
                <div>{!isExist && <p className='text-red-500  font-bold'>{message}</p>}</div>
                <div className=' flex justify-center items-center'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input className='block border rounded-md p-1'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                       
                        <button className='bg-green-200 width-[100%] p-1 hover:bg-green-500 my-5 flex justify-center items-center ' type="submit">get OTP</button>
                        
                    </form>
                </div>
                
            </div>
            }
        </div>
    )
}

export default Forgetpassword
import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate } from 'react-router-dom'
import OTPpage from '../OTPpage';


const generateOTP = async () => {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    return OTP.toString();
}
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('')
    const [page, setPage] = useState(false);
    // const navigate = useNavigate();

    //abhishek start
    // const [email, setemail] = useState('');

    const handleOTP = async () => {

        try {
            const newOTP = await generateOTP();

            await axios.post('http://localhost:8080/sendotp', { otp: newOTP, email: email });

            console.log(newOTP);
            setOtp(newOTP)
            // console.log(otp);
            console.log('OTP sent successfully');

            setPage(true)
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    }
    ///abhishek end


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/formpage', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                setMessage('Login successful');
                handleOTP();

            } else {
                setMessage(response.data.error || 'Unknown error occurred');
            }
        } catch (error) {
            if (error.response.status === 401) {
                if (error.response.data.error === 'Email not found') {
                    setMessage('Email incorrect');
                } else if (error.response.data.error === 'Password incorrect') {
                    setMessage('Password incorrect');
                }
            } else {
                setMessage('Internal Server Error');
            }
        }
    };

    return (
        <div>

            <div className='font-bold my-1 flex justify-center items-center'>{message}</div>
            {page ? <OTPpage otp={otp} setOtp={setOtp} email={email} resendFunction={handleOTP} /> :
                <div>
                    <form onSubmit={(event) => { handleSubmit(event) }}>
                        <div>
                            <label>Email:</label>
                            <input
                                className='block rounded-md'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                className='block'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex justify-between mt-2'>
                            <button className='bg-blue-100 hover:bg-blue-500 p-1 rounded-md w-[30%]' type="submit">Login</button>

                        </div>
                    </form>
                    <div>
                        <Link to='/forgetpassword'>
                            <button className='text-blue italic text-sm text-blue-600 hover:text-base font-semibold'>Forget password</button>
                        </Link>
                    </div>

                </div>


            }
        </div>
    );
};

export default Login;

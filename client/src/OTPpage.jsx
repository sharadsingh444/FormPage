import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const OTPpage = ({ otp, setOtp, email, resendFunction }) => {

  const [value, setValue] = useState('');
  const [para, setPara] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(1);
  const [isSuccess, setisSuccess] = useState(false);
  const [message, setMessage] = useState()
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          updateOTP(email);
          clearInterval(interval);
        }  
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const resendOTP = async () => {
    resendFunction();
    setPara('');
    setMinutes(1);
    setSeconds(1);
  };
  
  // update otp as null
  async function updateOTP(email) {
    try {
      const response = await axios.put(`http://localhost:8080/update-otp/${email}`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating OTP:', error.response.data.error);
    }
  }

/// verify otp
  const handleClick = async () => {
    try {
        const response = await axios.post('http://localhost:8080/verifyotp', { email: email, otp: value });
     
        if (response.status === 200) {
            if (response.data.message === 'Login successfully') {
                setisSuccess(true);
                setPara("OTP Verification Successful");
                <Navigate to='/home2'/>
            } else {
                setMessage(response.data.error || 'Unknown error occurred');
                setisSuccess(false);
                setPara("OTP Incorrect");
            }
        } else {
            setMessage(response.data.error || 'Unknown error occurred');
            setisSuccess(false);
            setPara("OTP Incorrect");
        }
    } catch (error) {
        setMessage(error.response.data.error || 'Network error occurred');
        setValue('');
        setisSuccess(false);
        setPara("OTP Incorrect");
    }
    setValue('');
};
  return (
    <div className='bg-blue-200 h-[230px] w-[400px] rounded-lg '>
      <div className='m-6 flex flex-col gap-4'>
        <h1 className={`text-2xl font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{para}</h1>

        <h2>Type OTP here Sent on your mail</h2>
        <input className='w-[250px] outline-none p-2 rounded-lg mt-2' id="username" type="number" max="6" onChange={(e) => setValue(e.target.value)} value={value} />
        <div className='flex mt-7'>
          <div className="countdown-text">
            {seconds > 0 || minutes > 0 ? (
              <p>
                OTP Remaining For : {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}

              </p>
            ) : (
              <div><p className='text-red-600'>Your OTP has been Expired </p> <button onClick={resendOTP}>Resend OTP</button></div>

            )}


          </div>

          <button className='bg-blue-500 hover:bg-blue-800 text-white h-7 ml-[90px] px-2 rounded-md' onClick={handleClick}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
  
};

export default OTPpage
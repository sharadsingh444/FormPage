
import React, { useState } from 'react';
import Login from './login/login';
import Register from './register';

const FormPage = () => {

    const [isLogin, setIsLogin] = useState(true); // Indicates whether user is in login or register mode

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login or register logic here
        console.log('Email:', email);
        console.log('Password:', password);
        // You can send this data to your backend for authentication
    };

    return (
        <div className='flex w-[100%] h-[100vh]  bg-slate-300 justify-center items-center'>
            
            <div className=' flex-col w-[60%] h-[80%] bg-slate-100 '>
                <div className='text-xl items-center w-[100%];'>
                    <h2 className='text-center font-extrabold'>{isLogin ? 'Login' : 'Register'}</h2>
                </div>
                <div className=' w-[100%] flex-col P-1'>
                    <div className='w-[100%] flex justify-center items-center py-[10%]'>
                        {
                            isLogin ? <Login /> : <Register />
                        }

                        <>
                            {/* <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input className='block'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input className='block'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className='bg-blue-100 hover:bg-blue-500 p-1' type="submit">{isLogin ? 'Login' : 'Register'}</button>
                    </form> */}
                        </>
                    </div>
                    <div className='w-[100%] flex items-center justify-center'>
                       
                        <p >{isLogin ? "Don't have an account?" : "Already have an account?"} <button className='bg-blue-100 hover:bg-blue-500 p-1' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</button></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPage
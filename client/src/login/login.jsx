import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/formpage', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                setMessage('Login successful');
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
            <form onSubmit={handleSubmit}>
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
                    <button className='text-blue italic text-sm text-blue-600 hover:text-base'>Forget password</button>
                </div>
            </form>
        </div>
    );
};

export default Login;

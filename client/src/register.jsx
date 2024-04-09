import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
    
  });
  const [message, setMessage]=useState('');

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8080/register',formData);
      console.log('Response:', response.data);
      if(response.status===200)
        setMessage(response.data.message || 'Unknown error try again')
    }
    catch(error){
      console.log('Error', error);
      
      if(error.response.status===500)
      {
        setMessage('Internal Error');
      }
      else
        setMessage('Server Error Try Again');
    }
  };


  return (
    <div >
      <h2 className='font-bold p-2 flex'>{message}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input className='block' 
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input className='block'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input className='block'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button className='bg-blue-100 hover:bg-blue-500 p-1' type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
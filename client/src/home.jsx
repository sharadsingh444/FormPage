import React from 'react'
import FormPage from './formPage'
import { Link } from 'react-router-dom'
import Img from '../public/Image/k.jpg'


const Home = () => {

    return (
        <div className='w-[100%] h-[100vh] flex-col bg-cyan-100'>
            <div className='w-[100%] h-[10%] flex justify-center item-center py-5'>
                <h1 className='italic text-lg text-blue-500 font-bold'>Welcome to Our Website</h1>
            </div>
            <div className='flex w-[100%] h-[90%] '>
                <div className='w-[80%] h-[100%] '>
                    <img className='w-[80%] h-[100%] ' src={Img} alt='home-pic' />

                </div>
                <div className=' w-[20%] h-[100%] flex-col justify-center items-center '>
                <h3>Plese Login to move next</h3>
                    <div>
                        <Link to='/formpage'>
                        <button className='bg-blue-100 hover:bg-blue-500 p-1 rounded-md w-[100%]' >Login In</button>
                        </Link>
                       
                    </div>
                   

                </div>
            </div>

        </div>
    )
}

export default Home
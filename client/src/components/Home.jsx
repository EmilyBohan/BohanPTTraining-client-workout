import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (

        <div className='h-full w-full flex justify-center items-center gap-2'>
            <Link to='/signup' className='p-2 bg-black text-white hover:text-black hover:bg-gray-700 rounded-lg'>
                Sign Up
            </Link>
            <Link to='/login' className='p-2 bg-black text-white hover:text-black hover:bg-gray-700 rounded-lg'>
                Login 
            </Link>
        </div>

    )
}

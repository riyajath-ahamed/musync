import React from 'react'
import { NavLink } from 'react-router-dom';
import logo4 from '../Asset/logo4.png';

const Header = () => {
  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
        <NavLink to={"/"}>
        <img src={logo4} alt="logo" className='w-16'/>
        </NavLink>

        <ul className='flex items-center justify-center ml-7'>
            <li className='mx-5 text-lg'><NavLink to={'/home'} >Home</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={'/musics'}>Musics</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={'/premium'}>Premium</NavLink></li>
            <li className='mx-5 text-lg'><NavLink to={'/aboutus'}>About Us</NavLink></li>
        </ul>

    </header>
  )
}

export default Header
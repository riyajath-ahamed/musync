import React from 'react'
import Header from './Header'
import Hero from './Hero'
import { NavLink } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'



const Home = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary scroll-smooth'>
      <Header/>
      <p className='text-7xl font-bold '>Let The <span className='bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-8xl font-bold hover:drop-shadow-lg hover:shadow-yellow-600/60'>Music </span></p>
      <p className='text-8xl font-bold'> <span className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent '>Move</span> You !</p>
      <p className='mb-6 font-light text-3xl text-gray-500'>Feel the beat of your emotions with personalized playlists</p>
      
      <div className='w-full h-auto fle flex lg:flex-row items-center justify-center bg-primary gap-6' >
        <Hero/>
        <NavLink
            to={"/library"}
          >
        <div className='bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 ease-in-out delay-150 h-340 w-275 rounded-lg transition shadow-lg shadow-pink-600/60'
        
        >
          <div className='flex flex-col items-start p-11 justify-center h-full w-full text-white text-4xl font-bold hover:animate-pulse'>
            Move <span>To</span> <span className='text-5xl'>Library</span>
          </div>
        </div>
        </NavLink>
        
      </div>

      <div className='flex flex-row p-4  w-880 items-start justify-start'>
        <p className='text-left text-3xl font-bold items-start right-6'>New Release</p>
      </div>
      <div className='flex flex-nowrap gap-36 snap-start'>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>
        <div> IDWDII</div>

      </div>
      
    </div>
  )
}

export default Home
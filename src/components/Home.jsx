import React from 'react'
import Header from './Header'
import Hero from './Hero'



const Home = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      <Header/>
      <p className='text-7xl font-bold '>Let The <span className='bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-8xl font-bold hover:drop-shadow-lg'>Music </span></p>
      <p className='text-8xl font-bold'>Move You !</p>
      <p className='mb-6 font-light text-3xl text-gray-500'>Feel the beat of your emotions with personalized playlists</p>
      <div className='w-full h-auto flex flex-col items-center justify-center bg-primary' >
        <Hero  className="items-center justify-center w-150"/>
      </div>
      
    </div>
  )
}

export default Home
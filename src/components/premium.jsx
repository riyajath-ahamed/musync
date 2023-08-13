import React from 'react'
import Header from './Header'

const premium = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'> 
    <Header/>
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":15}}></span>
    </span>
    days
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":10}}></span>
    </span>
    hours
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":24}}></span>
    </span>
    min
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span style={{"--value":54}}></span>
    </span>
    sec
  </div>
</div>
	<h1 class="text-9xl font-extrabold text-white tracking-widest">UNDER DEVLOPMENT</h1>
	<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute text-white">
		<p className='font-bold'>Page Not Found</p>
    <p className='font-bold'>තාම හදනවා !!</p>
    
	</div>
  
	
</main>

      
    </div>
  )
}

export default premium
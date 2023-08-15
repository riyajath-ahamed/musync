import React from 'react'
import Header from './Header'

const premium = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'> 
    <Header/>
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">UNDER DEVLOPMENT</h1>
	<div class="bg-[#FF6A3D] p-4 text-sm rounded-3xl absolute text-white">
    <div className="mockup-phone">
  <div className="camera"></div> 
  <div className="display">
    <div className="artboard artboard-demo phone-1">
    <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img src="https://i.pinimg.com/564x/91/08/27/9108274dd4fad63fe146211a3dc7d511.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Kakashi Hatake
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">
    Delivered
  </div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img src="https://i.pinimg.com/564x/6d/b4/30/6db4305ff3c2a1405d5e73a67436d1e8.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Obito Uchiha
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">Its Coming Home</div>
  <div className="chat-footer opacity-50">
    Seen at 12:46
  </div>
</div>
    </div>
  </div>
</div>
    
	</div>
  
	
</main>

      
    </div>
  )
}

export default premium
import React from 'react'
import logo5 from '../Asset/logo62.png';
import  bg1  from '../Asset/bg1.mp4';

const Signup = () => {
  return (
   
<div class="relative w-screen h-screen "> 
<video
        src={bg1}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
  <div class=" absolute inset-0 flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row">
    <div class="flex flex-col bg-darkOverlay shadow-2xl rounded-3xl items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
        
      <div class="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
        <div class="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
          <img src={logo5} className=" drop-shadow-lg shadow-cyan-600"/>
          
          <p className='text-white font-semibold text-lg p-4'>Music is an integral part of our daily lives, and we often use it to express and evoke emotions.and we provideadvanced computer vision and machine learning algorithms to analyze the emotions of a user through facial expressions and generate a playlist of music that matches their current mood</p>
        </div>
      </div>
      <div class="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
        <div class="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">
          <p class="w-full text-4xl font-medium text-center leading-snug ">Sign up for an account</p>
          <div class="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
            <div class="relative">
              <p class="bg-white font-medium text-gray-600
                  ">Username</p>
              <input placeholder="John" type="text" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
            </div>
            <div class="relative">
              <p class="bg-white   font-medium text-gray-600 ">Email</p>
              <input placeholder="123@ex.com" type="text" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
            </div>
            <div class="relative">
              <p class="bg-white pt-0 font-medium text-gray-600
                 ">Password</p>
              <input placeholder="Password" type="password" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
            </div>
            <div class="relative">
              <a class="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-600
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease">Submit</a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
  )
}

export default Signup
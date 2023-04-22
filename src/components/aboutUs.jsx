import React from 'react'
import Header from './Header'
import {CgUserlane} from "react-icons/cg"
import { IoSpeedometer } from 'react-icons/io5'
import { SiServerless } from 'react-icons/si'

const aboutus = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      <Header/>

      <section class="bg-primary dark:bg-gray-900">
            <div class="w-full px-6 py-10 mx-auto">
                <div class="lg:flex lg:items-center">
                    <div class="w-full space-y-12 lg:w-1/2 ">
                        <div>
                            <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Let the music move you!</h1><br/><span className='text-2xl font-medium'>Our streaming system recognizes your emotions and creates personalized playlists just for you</span>
                        
                            <div class="mt-2">
                                <span class="inline-block w-40 h-1 rounded-full bg-orange-600"></span>
                                <span class="inline-block w-3 h-1 ml-1 rounded-full bg-orange-400"></span>
                                <span class="inline-block w-1 h-1 ml-1 rounded-full bg-yellow-500"></span>
                            </div>
                        </div>

                        <div class="md:flex md:items-start md:-mx-4">
                            <span class="inline-block p-2 text-orange-400 bg-orange-100 rounded-xl md:mx-4 dark:text-white dark:bg-orange-400">
                                <CgUserlane className="w-6 h-6"/>
                            </span>

                            <div class="mt-4 md:mx-4 md:mt-0">
                                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Emotion recognition</h1>

                                <p class="mt-3 text-gray-500 dark:text-gray-300">
                                The system uses machine learning algorithms to analyze users' facial expressions and physiological signals to infer their emotional states.
                                </p>
                            </div>
                        </div>

                        <div class="md:flex md:items-start md:-mx-4">
                        <span class="inline-block p-2 text-orange-400 bg-orange-100 rounded-xl md:mx-4 dark:text-white dark:bg-orange-400">
                                <IoSpeedometer className="w-6 h-6"/>
                            </span>

                            <div class="mt-4 md:mx-4 md:mt-0">
                                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Peak Performace</h1>

                                <p class="mt-3 text-gray-500 dark:text-gray-300">
                                This information is used to personalize the music experience and create playlists that match the users' moods.
                                </p>
                            </div>
                        </div>

                        <div class="md:flex md:items-start md:-mx-4">
                        <span class="inline-block p-2 text-orange-400 bg-orange-100 rounded-xl md:mx-4 dark:text-white dark:bg-orange-400">
                                <SiServerless className="w-6 h-6"/>
                            </span>
                            

                            <div class="mt-4 md:mx-4 md:mt-0">
                                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Serverless Intergration</h1>

                                <p class="mt-3 text-gray-500 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
                        <img class="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full" src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80" alt="" />
                    </div>
                </div>

                <hr class="border-gray-200 my-12 dark:border-gray-700" />

                <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                   
                </div>
            </div>
        </section>

    </div>
  )
}

export default aboutus
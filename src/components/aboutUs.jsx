import React from 'react'
import Header from './Header'
import { CgUserlane } from "react-icons/cg"
import { IoSpeedometer } from 'react-icons/io5'
import { SiServerless } from 'react-icons/si'
import { BsGithub } from 'react-icons/bs'
import logo from "../Asset/logo4.png"

const aboutus = () => {
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
            <Header />

            <section class="bg-primary dark:bg-gray-900">
                <div class="w-full px-6 py-10 mx-auto">
                    <div class="lg:flex lg:items-center">
                        <div class="w-full space-y-12 lg:w-1/2 ">
                            <div>
                                <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Let the music move you!</h1><br /><span className='text-2xl font-medium'>Our streaming system recognizes your emotions and creates personalized playlists just for you</span>

                                <div class="mt-2">
                                    <span class="inline-block w-40 h-1 rounded-full bg-orange-600"></span>
                                    <span class="inline-block w-3 h-1 ml-1 rounded-full bg-orange-400"></span>
                                    <span class="inline-block w-1 h-1 ml-1 rounded-full bg-yellow-500"></span>
                                </div>
                            </div>

                            <div class="md:flex md:items-start md:-mx-4">
                                <span class="inline-block p-2 text-orange-400 bg-orange-100 rounded-xl md:mx-4 dark:text-white dark:bg-orange-400">
                                    <CgUserlane className="w-6 h-6" />
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
                                    <IoSpeedometer className="w-6 h-6" />
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
                                    <SiServerless className="w-6 h-6" />
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
                            <img class="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] drop-shadow-md rounded-full" src={logo} alt="" />
                        </div>
                    </div>

                    <hr class="border-gray-200 my-12 dark:border-gray-700" />

                    <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">

                    </div>
                </div>
            </section>
            <footer className="footer footer-center p-10 bg-orange-100 text-primary-content">
                <div>
                    <img class="w-20 h-20 object-cover  drop-shadow-md " src={logo} alt="" />
                    <p className="font-bold text-orange-600">
                        MuSync. <br /> Emotion Delection Partner
                    </p>
                    <p className='text-orange-500'> © 2023. All rights reserved -<span className='block lg:inline-block'> Made with<span className='inline-block h-4'>{heart}</span> by<a href='https://github.com/riyajath-ahamed'> Riyajath Ahamed</a></span></p>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4 text-orange-600">
                        <a href='https://github.com/riyajath-ahamed/musync'>
                        <BsGithub className='w-6 h-6'/>
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default aboutus

export const heart = <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="0" stroke="currentColor" class="w-5 h-5">
<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
import React from 'react'
import Header from './Header'
import { CgUserlane } from "react-icons/cg"
import { IoSpeedometer } from 'react-icons/io5'
import { SiServerless } from 'react-icons/si'
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
                    <p className='text-orange-500'>Copyright © 2023 - All right reserved</p>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4 text-orange-600">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default aboutus
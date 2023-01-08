import React from 'react';
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


import {FcGoogle} from 'react-icons/fc';
import  bg1  from '../Asset/bg1.mp4';
import logo1 from '../Asset/logo1.png';
import { useEffect } from 'react';

const Login = ({setAuth}) => {


  const firbaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const loginWithGoogle = async() => {
    console.log('login with google')

    await signInWithPopup(firbaseAuth, provider).then((userCred) => {
      //console.log(userCred);
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem('auth', "true");
        firbaseAuth.onAuthStateChanged((userCred)=>{
          if (userCred) {
            //console.log(userCred);
            userCred.getIdToken().then((token) =>{
              console.log(token);
            })
            navigate("/", {replace : true})
          }
          else{
            setAuth(false);
            navigate("/login")
          }
        })
      }
    }) 



  };

//session handling Login session and redirect to home page or login page

  useEffect(( ) => {
    if(window.localStorage.getItem('auth') === "true"){
      navigate("/", {replace : true})
    }
  }, [])
  
  return (
    <div className='relative w-screen h-screen'>
      <video
        src={bg1}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
        <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex-col items-center justify-center'>
          <div className="bg-white rounded-lg overflow-hidden mb-5 shadow-2xl">
            <div className="group p-8 hover:bg-cyan-700 hover:shadow-md duration-100 ease-in-out transition-all" >
              <div className='font-bold group-hover:text-white'>
                <img src={logo1} alt="logo" className='h-30 md:w-50 lg:w-30'/>
              </div>
              
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="p-8">
                <label for="email" className="block mb-2 text-2xl font-medium text-black">Login</label>
                    <form method="POST" className="" action="#" onsubmit="return false;">
                        <div className="mb-5">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                            <input type="text" name="email" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />
                        </div>
                        <div className="mb-5">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                            <input type="password" name="password" className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none" />
                        </div>
                        <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">Login</button>
                    </form>
                </div>
                <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
                    <a className="font-medium text-indigo-500">Create account</a>
                    <a className="text-gray-600">Forgot password?</a>
                </div>
            </div>
            
          </div>
          <div 
          onClick={loginWithGoogle} 
          className='flex items-center justify-center gap-2 px-4 py-2 mt-5 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all'
          
          >
            <FcGoogle className='text-xl'/>Sign in with Google
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
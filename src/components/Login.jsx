import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { app } from "../config/firebase.config";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


import {FcGoogle} from 'react-icons/fc';
import  bg1  from '../Asset/bg1.mp4';
import logo5 from '../Asset/logo62.png';
import { useEffect } from 'react';

import { useStateValue } from '../context/StateProvider';
import { validateUser } from '../api';
import { actionType } from '../context/reducer';
import Signup from './Signup';

const Login = ({setAuth}) => {


  const firbaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [{user}, dispatch] = useStateValue(); 

  const loginWithGoogle = async() => {
    //console.log('login with google')

    await signInWithPopup(firbaseAuth, provider).then((userCred) => {
      //console.log(userCred);
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem('auth', "true");
        firbaseAuth.onAuthStateChanged((userCred)=>{
          if (userCred) {
            //console.log(userCred);
            userCred.getIdToken().then((token) =>{
              //console.log(token);
              validateUser(token).then((data) =>{
                dispatch({
                  type: actionType.SET_USER,
                   user: data
                })
              })
            })
            navigate("/", {replace : true})
          }
          else{
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
               user: null
            })
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
        <div className='w-full h-auto md:w-375 px-3 py-4 bg-lightOverlay shadow-2xl rounded-lg backdrop-blur-md flex-col items-center justify-center'>


          {/* Logo */}

          <div className="bg-white rounded-lg overflow-hidden mb-5 p-5 flex justify-center items-center  shadow-2xl">
                <img src={logo5} alt="logo" className='h-20 md:w-25 lg:w-30 '/>
 
          </div>


          {/* <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl px-8 p-5">
                
                <label for="email" className="block mb-2 text-2xl font-semibold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Login</label>


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
                
                <div className="flex flex-col justify-center items-center p-4 gap-2 text-base border-t border-gray-300 bg-white">
                  <hr/>
                    
                     <p className="text-gray-600">Forgot password?</p> 
                    <p className="font-medium text-white w-full text-center cursor-pointer bg-indigo-300 p-2 rounded-lg "><NavLink to={"/signup"}>Create account</NavLink></p>
                </div>
            </div>
            
          </div> */}
          
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
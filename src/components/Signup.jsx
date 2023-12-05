import React, { useEffect, useState } from 'react'
import logo5 from '../Asset/logo62.png';
import  bg1  from '../Asset/bg1.mp4';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useStateValue } from '../context/StateProvider';
import { validateUser } from '../api';
import { actionType } from '../context/reducer';
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const auth = getAuth();
  const [{ user }, dispatch] = useStateValue();

  //const firebaseAuth = getAuth(app);
  //const provider = new GoogleAuthProvider();
  const navigate = useNavigate();


  const register = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setErrorMessage('');
      alert('Registration successful!');
      const token = await user.getIdToken();
      const data = await validateUser(token);

      dispatch({
        type: actionType.SET_USER,
        user: data,
      });
      navigate("/login", { replace: true });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Registration failed:', errorCode, errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  function handleClick() {
    window.location.href = "/Login";
  }

  useEffect(() => {
    if (window.localStorage.getItem("auth" === "true")) {
      navigate("/", { replace: true });
    }
  });


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
      <div class="w-full mt-10 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
        <div class="flex flex-col items-start justify-start pt-5 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">
          <p class="w-full text-4xl font-medium text-center leading-snug ">Sign up for an account</p>
          <div class="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
            {/* <div class="relative">
              <p class="bg-white font-medium text-gray-600
                  ">Name</p>
              <input placeholder="John" type="text" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  value={name}
                onChange={(e) => setName(e.target.value)}
                required
                  
                  />
            </div> */}
            <div class="relative">
              <p class="bg-white   font-medium text-gray-600 ">Email</p>
              <input placeholder="youremail@gmail.com" type="text" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                  
                  />
            </div>
            <div class="relative">
              <p class="bg-white pt-0 font-medium text-gray-600
                 ">Password</p>
              <input placeholder="********" type="password" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  
                  value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                  
                  />
            </div>
            <div class="relative">
              <p class="bg-white pt-0 font-medium text-gray-600
                 "> Confirm Password</p>
              <input placeholder="********" type="password" class="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                  
                  value={confirmPassword}
                  required
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  
                  />
            </div>
            <div class="relative">
              <a class="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-600
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease" onClick={() => register()}>Submit</a>
            </div>
            <p className="font-medium text-white w-full text-center cursor-pointer bg-indigo-300 p-2 rounded-lg "><NavLink to={"/login"}>Have an Account</NavLink></p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
  )
}

export default Signup
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo4 from "../Asset/logo4.png";
import emo from "../Asset/emo1.png";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

import { useStateValue } from "../context/StateProvider";
import { getApp } from "firebase/app";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import Login from "./Login";

import { motion } from "framer-motion";

const Header = () => {

  const[{user}, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)
const navigate = useNavigate();

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem('auth', "false");
    }).catch((e) => console.log(e));
    navigate("/login", {replace: true})
  }

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={logo4} alt="logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/library"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Library
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/face"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <img src={emo} alt="logo" className="w-20" />
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Blog
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/aboutus"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            About Us
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center ml-auto cursor-pointer gap-2 relative"
      onMouseEnter={() => setIsMenu(true)}
      onMouseLeave={() => setIsMenu(false)}
      >
        <img src={user?.user?.imageURL} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' alt="userlog0" referrerPolicy="no-referrer" />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">{user?.user?.name}</p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">{user?.user?.role}</p>
        </div>



        {
          isMenu && (
            <motion.div 
        initial={{opacity: 0, y: 50}}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="absolute z-10 flex flex-col top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm " >
          <NavLink to={'/userProfile'}>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">Profile</p>
          </NavLink>
          <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">My Favorites</p>
          <hr/>
          <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out" onClick={logOut}>Sign Out</p>

        </motion.div>
          )
        }

      </div>
    </header>
  );
};

export default Header;

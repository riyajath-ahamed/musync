import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo4 from "../Asset/logo4.png";
import emo from "../Asset/emo1.png";

import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

import { useStateValue } from "../context/StateProvider";

import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";



import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

const Header = () => {
  const [{ user, isSongPlaying }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });

      if (isSongPlaying) {
        dispatch({
            type: actionType.SET_ISSONG_PLAYING,
            isSongPlaying: false,
          });
        }
  
  };

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

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 pl-10 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          src={user?.user?.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg bg-white p-1 "
          alt="userlogo"
          referrerPolicy="no-referrer"
        />

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 flex flex-col top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm "
          >
            <div className="flex flex-row bg-slate-400 gap-1 rounded-lg p-5">
              <div className="flex flex-col">
                <img
                  src={user?.user?.imageURL}
                  className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg "
                  alt="userlogo"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-white text-lg hover:text-headingColor font-semibold">
                  {user?.user?.name}
                </p>
                <p className="flex items-center gap-2 text-xs text-white font-normal">
                  {user?.user?.role}
                </p>
              </div>
            </div>
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <NavLink to={"/favorite"}>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Favorites
            </p>
            </NavLink>
            <hr />

            {user?.user?.role === "Admin" && (
              <>
                <div className="flex items-baseline">
                  <NavLink to={"/dashboard/home"}>
                    <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                      Dashboard
                    </p>
                  </NavLink>
                </div>
                <hr />
              </>
            )}

            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;

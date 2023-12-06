import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, Premium, Face, Signup, AboutUs, MusicPlayer, Library, Profile, Favorites, Alert } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

import { AnimatePresence ,motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const firbaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user, isSongPlaying, alertType}, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const isAdminUser = () => {
    if (user) {
      return user.user.role === "Admin";
    }
    return false;
  }

  useEffect(() => {
    firbaseAuth.onAuthStateChanged((userCred) => {
      //console.log(userCred)
      if (userCred) {
        userCred.getIdToken().then((token) => {
          //console.log(token);
          validateUser(token).then((data) => {
            //console.log(data);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            })


          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        })
        navigate("/login");
      }
    });
  }, []);

  const isAdmin = isAdminUser();

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        <Routes>
        {auth ? (
        <>
          <Route path="/*" element={<Home />} />
          {isAdmin && (
            <Route path="/dashboard/*" element={<Dashboard />} />
          )}
          <Route path="/premium" element={<Premium />} />
          <Route path="/library" element={<Library />} />
          <Route path="/face" element={<Face />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/userProfile" element={<Profile />} />
          <Route path="/favorite" element={<Favorites />} />
        </>
      ) : (
        <>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        </>
        
      )}
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl  backdrop-blur-md flex items-center justify-center rounded-t-3xl`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
      {alertType && <Alert type={alertType}/>}
    </AnimatePresence>
  );
};

export default App;

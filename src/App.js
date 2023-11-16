import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, Premium, Face, Signup, AboutUs, MusicPlayer, Library, Profile } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

import { AnimatePresence ,motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const firbaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user, isSongPlaying}, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const isAdminUser = () => {
    if (user) {
      return user.user.role === "admin";
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

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          {isAdminUser() && <Route path="/dashboard" element={<Dashboard />} />}
          <Route path="/premium" element={<Premium />} />
          <Route path="/library" element={<Library />} />
          <Route path="/face" element={<Face />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userProfile" element={<Profile />} />
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
    </AnimatePresence>
  );
};

export default App;

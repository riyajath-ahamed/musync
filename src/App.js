import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, Premium, Face, Signup, AboutUs } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const firbaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user}, dispatch] = useStateValue();

  

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

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
          <Route path="/dashboard/*" element={<Dashboard/>} />
          <Route path="/premium" element={<Premium/>} />
          <Route path="/face" element={<Face/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;

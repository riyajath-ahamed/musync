import React from "react";

import { motion } from "framer-motion";

const Alert = ({ type }) => {
  const tickIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );

  const errorIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );

  const warningicon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );

  //Editing the alert component with custom alert messages

  return (
    <motion.div
        initial={{translateX : 200, opacity: 0}}
        animate={{translateX : 0, opacity: 1}}
        exit={{translateX : 200, opacity: 0}}
        key={type}
      className={`fixed top-12 right-12 px-4 py-2 rounded-full backdrop-blur-md flex items-center justify-center shadow-xl 
        ${type === "success" && "border-2 border-green-500 text-base"}
        ${type === "error" && "border-2 border-red-500 text-base"}
        ${type === "warning" && "border-2 border-yellow-500 text-base"}
    `}
    >
      {/* Success alert statment */}
      
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <div class="bg-green-500 inline-block rounded-full p-1 mr-1 text-white">
            {tickIcon}
          </div>

          <p className="text-xl font-semibold ">Data saved</p>
          <p className="text-sm font-light"> Success Description</p>
        </div>
      )}

      {/* error alert statment */}

      {type === "error" && (
        <div className="flex items-center justify-center gap-4">
          <div class="bg-red-500 inline-block rounded-full p-1 mr-1 text-white">
            {errorIcon}
          </div>

          <p className="text-xl font-semibold ">
            Somting went wrong..
          </p>

          <p className="text-sm font-light"> error descriptin</p>
        </div>
      )}

      {/* warning alert statment */}

      {type === "warning" && (
        <div className="flex items-center justify-center gap-4">
          <div class="bg-yellow-500 inline-block rounded-full p-1 mr-1">
            {warningicon}
          </div>

          <p className="text-xl font-semibold ">Waring with some errors</p>
          <p className="text-sm font-light"> Warning Description</p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;

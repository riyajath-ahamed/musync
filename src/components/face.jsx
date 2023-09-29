import React, { useState } from 'react'
import Header from './Header'
import { loadModels } from './Utils/emotionApi';
import Camera from './Utils/Camera/Camera';

const Face = () => {
  //loadModels();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);

  const openCamera = () => {
    setIsCameraOpen(true);
    loadModels();
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleEmotion = (emotion) => {
    setCurrentEmotion(emotion);
  };

  const closeDialog = () => {
    document.getElementById("my_modal_2").close();
    setCurrentEmotion(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header />
      {currentEmotion && (
        <dialog
          id="my_modal_2"
          className="absolute z-10 flex flex-col top-48 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm "
        >
          <button className="btn btn-circle w-12 h-12 btn-outline" onClick={closeDialog}>

            {/* TODO : Update this Modal With emotion related gif or image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Emotion</h3>
            <p className="py-4">
              {" "}
              You are currently feeling{" "}
              <span className="font-bold">{currentEmotion}</span>{" "}
            </p>
            <img src='https://i.pinimg.com/originals/8d/7a/0a/8d7a0adfe5d3b0bb9b6e0825800a69a5.gif' className='w-full' />
          </div>

          
        </dialog>
      )}
      <div className="alert w-880 alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-yellow-600 opacity-75"></span>
        <span>
          Enjoy an enhanced experience with our app! 📷 We now use your{" "}
          <span className="font-bold">Camera to read your environment</span>.
          Your privacy is our priority. We only access it with your permission.{" "}
          {/* TODO : This line Should be removed after the demo */}
          {currentEmotion && (
            <span className="font-bold">
              You are currently feeling {currentEmotion}
            </span>
          )}
        </span>
      </div>

      {!isCameraOpen && (
        <a
          onClick={openCamera}
          class="relative m-12  w-48 h-48 px-5 rounded-full py-3 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100  shadow-inner group"
        >
          <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span class="relative flex items-center justify-center transition-colors duration-300 delay-200 group-hover:text-white ease">
            Open Camera
          </span>
        </a>
      )}
      <div className="flex flex-row w-full h-full p-5 gap-4 bg-primary items-center justify-center ">
        {isCameraOpen && (
          <Camera
            className="rounded-lg"
            photoMode={false}
            closeCamera={closeCamera}
            handleEmotion={handleEmotion}
          />
        )}
        {isCameraOpen && (
          <a
            onClick={() => setIsCameraOpen(false)}
            class="relative cursor-pointer inline-flex items-center justify-start px-5 py-3 overflow-hidden font-medium transition-all bg-yellow-500 rounded-full hover:bg-white group"
          >
            <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
            <span class="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-blue-600">
              Close Camera
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

export default Face


import React from 'react'
import { image01, image02, image03, image04, image05 } from './Assets';

const EmotionModal = ({closeDialog, currentEmotion, playlistGenerated}) => {

const emotionImage = () => {
    switch (currentEmotion) {
        case 'happy':
            return image02;
        case 'sad':
            return image04;
        case 'angry':
            return image01;
        case 'neutral':
            return image03;
        case 'surprised':
            return image05;
        default:
            return image01;
    }
}

const emotionQuote = () => {
  switch (currentEmotion) {
      case 'happy':
          return "On cloud nine 😄";
      case 'sad':
          return "In the blues 💔";
      case 'angry':
          return  "Feeling fired up 🔥";
      case 'neutral':
          return  "Running on empty 😴";
      case 'surprised':
          return "Caught off guard! 😲";
      default:
          return image01;
  }
}

    const closeDialogBox = () => {
        document.getElementById("my_modal_2").close();
        //closeDialog;
      };

    
  return (
    <dialog
      id="my_modal_2"
      className="absolute z-10 flex flex-col top-48 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm "
      style={{
        backgroundImage: `url(${emotionImage()})`,
        backgroundSize: "cover",
      }}
    >
      <button
        className="btn btn-circle w-12 h-12 btn-outline"
        onClick={closeDialog}
        // TODO : Alertbox with the pallust genaration will be canceled
      >
        {/* TODO : [] Update this Modal With emotion related gif or image 
                 [] Update the close button with a cross icon
                 [] Update the text with the emotion detected
                 [] Update the mood phase and the playlist qutoe with the emotion detected
                 [] Emotions that can be detected : happy , sad , angry , neutral , surprised , fearful , disgusted 
                 [] mentioned pref:                 happy, sadness, relaxed, surprised, angry, tired , peaceful
      */}

        {/* TODO : [] handle exception for the unkown emotion */}

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
      <div className=" flex flex-col place-items-center modal-box bg-cardOverlay">
        <h3 className="font-bold text-lg">Emotion</h3>
        <p className="py-4">
          {" "}
          You are currently feeling{" "}
          <span className="font-bold">
            {currentEmotion}
            {" - "}
            {emotionQuote()}
          </span>{" "}
        </p>
        <img
          src="https://i.pinimg.com/originals/8d/7a/0a/8d7a0adfe5d3b0bb9b6e0825800a69a5.gif"
          className="w-full rounded-t-xl"
        />
        <p className="text-center relative bg-white rounded-b-xl pb-1 text-black">
          <span className="bg-gradient-to-r from-violet-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent font-bold">
            Crafting
          </span>{" "}
          a custom{" "}
          <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold">
            Playlist
          </span>{" "}
          to match your{" "}
          <span className='inline-block'>
          <span className="bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Vibe!
          </span>
            </span>
        </p>
      </div>
    </dialog>
  );
}

export default EmotionModal
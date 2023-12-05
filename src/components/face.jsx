import React, { useEffect, useState } from 'react'
import Header from './Header'
import { loadModels } from './Utils/emotionApi';
import Camera from './Utils/Camera/Camera';
import EmotionModal from './Utils/Tools/EmotionModal';
import { generatePlaylist, getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { useNavigate } from 'react-router-dom';

const Face = () => {
  const navigate = useNavigate();
  //loadModels();

  const [{allSongs, isSongPlaying}, dispatch] = useStateValue();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [playlistGenerated, setPlaylistGenerated] = useState(null);

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
    //document.getElementById("my_modal_2").close();
    setCurrentEmotion(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentEmotion) {
        try {
          const res = await generatePlaylist(currentEmotion);
          if (res) {
            console.log(" -------000000----->", res.playlist);
            const playlist = res.playlist;
  
            const data = await getAllSongs();
            dispatch({
              type: actionType.SET_NEW_SONGS,
              allSongs: data.data,
            });
  
            const songNames = [];
            for (const playlistId of playlist) {
              const matchingSong = data.data.find(song => song._id === playlistId);
  
              if (matchingSong) {
                songNames.push(matchingSong);
                const currentSong = {
                  id: matchingSong._id,
                  songURL: matchingSong.songURL,
                  imageURL: matchingSong.imageURL,
                  name: matchingSong.name,
                  album: matchingSong.album,
                  artist: matchingSong.artist,
                  genre: matchingSong.genre,
                };
                dispatch({
                  type: actionType.SET_PLAYLIST,
                  songs: currentSong,
                });

                if (!isSongPlaying) {
                  dispatch({
                    type: actionType.SET_ISSONG_PLAYING,
                    isSongPlaying: true,
                  });
                }

                const playNowSong = songNames[0];
                dispatch({
                  type: actionType.SET_SONG_INDEX,
                  songIndex: playNowSong,
                });

                dispatch({
                  type: actionType.SET_ALERT_TYPE,
                  alertType: "success",
                });

                setTimeout(() => {
                  dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: null,
                  });
                }, 2000);

                setTimeout(() => {
                  closeDialog();
                  navigate("/library")
                }, 10000);
                
              } else {
                songNames.push("Unknown"); // Handle unknown song IDs
              }
            }
            setPlaylistGenerated(songNames);
            console.log(" -------000000 song----->", songNames);
          }
        } catch (error) {
          // Handle errors here
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [currentEmotion])
  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
      <Header />
      {currentEmotion && (
        <EmotionModal closeDialog={closeDialog}  currentEmotion={currentEmotion} playlistGenerated={playlistGenerated}/>
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
          class="relative m-12  w-48 h-48 px-5 rounded-full py-3 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100 shadow-inner group"
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
          <div className='flex flex-col gap-2'>
          <progress className="progress w-32 progress-warning" value='60' max="100"></progress>
          {/* TODO : [] Update the progress bar with the correct value */}
          <a
            onClick={() => setIsCameraOpen(false)}
            class="relative cursor-pointer inline-flex items-center justify-start px-5 py-3 overflow-hidden font-medium transition-all bg-yellow-500 rounded-full hover:bg-white group"
          >
            
            <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
            <span class="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-yellow-500">
              Close Camera
            </span>
          </a>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Face


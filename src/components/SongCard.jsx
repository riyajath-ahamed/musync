import React, { useState } from 'react'
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { deleteObject, ref } from 'firebase/storage';
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllAlbums, getAllArtist, getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { storage } from '../config/firebase.config';

//add lazy loading to images and text

const SongCard = ({data, index, type , palace, openModal , trasferData }) => {

  const [isDelete, setIsDelete] = useState(false);

  const[{songIndex, isSongPlaying, user }, dispath] = useStateValue();

  const handleModalOpen = () => {
    openModal();
  };

  const handleDataTransfer = () => {
    trasferData(data);
  }

  const deleteData = (data) => {

    //console.log(data);

    // For deleting songs

    if(type === "song"){

      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => { 
      })

      //delete song
      deleteSongById(data._id).then((res) => {
        if(res.data){
          dispath({ 
            type: actionType.SET_ALERT_TYPE, 
            alertType: "success" 
          });

          setTimeout(() =>{
            dispath({ 
                type: actionType.SET_ALERT_TYPE, 
                alertType: null
              });
              }, 2000 
      
          );
          getAllSongs().then((data) => {
            dispath({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.data
            })
            
          })

        }else{
          dispath({ 
            type: actionType.SET_ALERT_TYPE, 
            alertType: "error" 
          });

          setTimeout(() =>{
            dispath({ 
                type: actionType.SET_ALERT_TYPE, 
                alertType: null
              });
              }, 2000 
      
          );

        }
        
      })

    }

    //For album

    if(type === "album"){

      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => { 
      })

      
      deleteAlbumById(data._id).then((res) => {
        if(res.data){
          dispath({ 
            type: actionType.SET_ALERT_TYPE, 
            alertType: "success" 
          });

          setTimeout(() =>{
            dispath({ 
                type: actionType.SET_ALERT_TYPE, 
                alertType: null
              });
              }, 2000 
      
          );
          getAllAlbums().then((data) => {
            dispath({
              type: actionType.SET_ALL_ALBUMS,
              all: data.data,
            });
            
          })

        }else{
          dispath({ 
            type: actionType.SET_ALERT_TYPE, 
            alertType: "error" 
          });

          setTimeout(() =>{
            dispath({ 
                type: actionType.SET_ALERT_TYPE, 
                alertType: null
              });
              }, 2000 
      
          );

        }
        
      })

    }

    //for artist

    if(type === "artist"){

      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => { 
      })

      
      deleteArtistById(data._id).then((res) => {
        if(res.data){
          dispath({ 
            type: actionType.SET_ALERT_TYPE, 
            alertType: "success" 
          });

          setTimeout(() =>{
            dispath({ 
                type: actionType.SET_ALERT_TYPE, 
                alertType: null
              });
              }, 2000 
      
          );
          getAllArtist().then((data) => {
            dispath({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.data,
            });
            
          })

        }else{
          dispath({ 
            type: actionType.SET_ALERT_TYPE, 
            alertType: "error" 
          });

          setTimeout(() =>{
            dispath({ 
                type: actionType.SET_ALERT_TYPE, 
                alertType: null
              });
              }, 2000 
      
          );

        }
        
      })

    }
  

  }

  const addToContext =(data) =>{
    if(!isSongPlaying){
      dispath({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      })
    }

    if(songIndex.name !== data.name ){ 
      const currentSong = {
        id: data._id,
        songURL: data.songURL,
        imageURL: data.imageURL,
        name:data.name,
        album: data.album,
        artist: data.artist,
        genre: data.genre,
};
      dispath({
        type: actionType.SET_SONG_INDEX,
        songIndex:currentSong ,
      })

      dispath({
        type: actionType.SET_PLAYLIST,
        songs:currentSong ,
      })
    }

   

  }

  //handleModalOpen

  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col "
      onClick={() => {
        switch (type) {
          case "song":
            addToContext(data);
            break;
          case "artist":
            handleModalOpen();
            handleDataTransfer();
            break;
          // Add more cases if needed
          default:
            // Handle the default case or do nothing
            break;
        }
      }}

      // Add the model type to the artist and albums
    >
      <div className="w-48 min-w-[160px] h-48 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden items-center">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt={data.name}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-headingColor font-semibold my-2 ">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : `${data.name}`}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}...`
              : `${data.artist}`}
          </span>
        )}
      </p>

      {/* can replace with a option dropdown usinfg headless ui in tailwind css 
      https://headlessui.com/react/tabs */}

      {user?.user?.role === "Admin" && palace === "sensitive" && (
        <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4  ">
          <motion.i
            whileTap={{ scale: 0.75 }}
            className="text-base rounded-md text-red-500 drop-shadow-md hover:text-white hover:bg-red-700"
            onClick={() => setIsDelete(true)}
          >
            <MdDelete />
          </motion.i>
        </div>
      )}

      

      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold">
            Are you sure do want to delete ?{" "}
          </p>

          <div className="flex items-center gap-4">
            <motion.button
              className="px-3 py-1 font-semibold text-sm uppercase bg-red-500 rounded-md hover:bg-red-700 cursor-pointer text-white"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>

            <motion.button
              className="px-3 py-1 font-semibold text-sm uppercase border-2 border-red-600 rounded-md"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SongCard
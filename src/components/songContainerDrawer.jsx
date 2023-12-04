import React, { useEffect, useState } from "react";
import { useStateValue } from '../context/StateProvider';
import { actionType } from "../context/reducer";

import { motion } from "framer-motion";
import { getAllNewSongs } from "../api";

const SongContainerDrawer = ({musics, drawerName}) => {



    const [{ isSongPlaying, songIndex, newSongs }, dispatch] = useStateValue();


    useEffect(() => {
      if (drawerName === "home") {
          getAllNewSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.data,
            });
          });
      }
    }, []);

    const addSongToContext = (data) => {
        if (!isSongPlaying) {
          dispatch({
            type: actionType.SET_ISSONG_PLAYING,
            isSongPlaying: true,
          });
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
          dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex:currentSong ,
          })

          dispatch({
            type: actionType.SET_PLAYLIST,
            songs:currentSong ,
          })
        }

        
      };

  return (
    <>
    {musics?.map((data, index) => (
      <motion.div
        key={data._id}
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col"
        onClick={() => addSongToContext(data)}
      >
        <div className="w-48 min-w-[160px] h-48 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden items-center">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={data.imageURL}
            alt=""
            className=" w-full h-full rounded-lg object-cover"
          />
        </div>

        <p className="text-base text-headingColor font-semibold my-2 ">
          {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
          <span className="block text-sm text-gray-400 my-1">
            {data.artist}
          </span>
        </p>
      </motion.div>
    ))}
  </>
  )
}

export default SongContainerDrawer


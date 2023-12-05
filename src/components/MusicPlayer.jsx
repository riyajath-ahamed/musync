import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider'

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { motion } from "framer-motion";
import {RiPlayListFill} from "react-icons/ri"
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { IoClose, IoMusicalNote } from 'react-icons/io5';

const MusicPlayer = () => {
    const [{allSongs, isSongPlaying,  songIndex, playlist }, dispath] = useStateValue();

    const [isPlayList, setIsPlayList] = useState(false);

    const closePlaylistModal= () => {
      setIsPlayList(false)
    }

    const nextTrack =(id) => {

        if(playlist.length > 1){
          const currentIndex = playlist.findIndex(song => song.id === id);
          let nextIndex = currentIndex + 1;
          if (nextIndex >= playlist.length) {
            nextIndex = 0;
          }
          const nextSong = playlist[nextIndex];
          dispath({
            type: actionType.SET_SONG_INDEX,
            songIndex:nextSong ,
          })
        }

    }

    const previousTrack =(id) => {

        if(playlist.length > 1){
          const currentIndex = playlist.findIndex(song => song.id === id);
          let nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex =  playlist.length - 1;
          }
          const nextSong = playlist[nextIndex];
          dispath({
            type: actionType.SET_SONG_INDEX,
            songIndex:nextSong ,
          })
        }
        
    }

    const closePlayer = () => {
        if (isSongPlaying) {
            dispath({
              type: actionType.SET_ISSONG_PLAYING,
              isSongPlaying: false,
            });

            dispath({
              type: actionType.SET_PLAYLIST,
              songs:null ,
            })
          }
    }

    const nowPlaying = () => {
      return (
        <div className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Now Playing {allSongs[songIndex]?.name}</span>
      </div>
      );
    };

    


  return (
    <div className='w-full flex items-center gap-3 '>
        <div className={`w-full items-center gap-3 p-4 flex relative`}>
            <img src={songIndex.imageURL} 
            alt='SongImage' 
            className='w-40 h-20 object-cover rounded-md' />

        <div className='flex items-start flex-col'>

        {songIndex && songIndex.name && (
            <p className='text-xl text-headingColor font-semibold'>
                {/* {`${
                    songIndex.name.length > 20
                    ? songIndex.name.slice(0, 20)
                    : songIndex.name
                }`}{" - "} */}
                
                 {`${songIndex.name.length > 20 ? songIndex.name.slice(0, 20) : songIndex.name}`}{" - "}
                <span className='text-base'>{songIndex.album}</span>


            </p>
        )}

            <p className='text-textColor font-semibold text-base'>
                {songIndex.artist}{" - "}
                <span className='text-sm text-textColor font-normal'>
                    {songIndex.genre}

                </span>
            </p>

            <motion.i
            whileTap={{scale : 0.8}}
            onClick={() => setIsPlayList(!isPlayList)}
            >
                <RiPlayListFill className='text-textColor hover:text-headingColor text-lg' />

            </motion.i>



        </div>    

        <div className='flex-1'>
            <AudioPlayer
             src={songIndex.songURL}
             onPlay={() => nowPlaying()} //add a alert for now playing
             autoPlay={true} //make true
             showSkipControls={true}
             showJumpControls={false}
             volume={0.5}
             onClickNext={() =>nextTrack(songIndex.id)}
             onClickPrevious={() => previousTrack(songIndex.id)}
             onEnded={() =>nextTrack(songIndex.id)}
            />
            

        </div>
        {
            isPlayList && (
                <PlaylistCard closePlaylistModal={closePlaylistModal}/>
            )
        }


        <IoClose 
        className='absolute -top-3 right-3 h-7 w-7 rounded-full text-white bg-orange-500 hover:bg-orange-700'
        onClick={closePlayer}/>



        </div>

    </div>
  )
}

export const PlaylistCard = ({closePlaylistModal }) => {
    const [{allSongs, playlist, isSongPlaying,  songIndex }, dispath] = useStateValue();

    const [isPlayListOpen, setIsPlayList] = useState(false);
    const [activeDialog, setActiveDialog] = useState(false);

    const closeModal = () => {
      closePlaylistModal();
    };

    useEffect(() => {
        if(!allSongs){
          getAllSongs().then((data) => {
            dispath({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.data,
            });
            
          })
        }
    
      }, []);


      const setCurrentPlaySong = (data) => {
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
          }
      };



    return(
        <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll rounded-md shadow-md bg-primary'>
           
           <button className='fixed w-80 px-3 py-1 z-10 bg-white rounded-full inline-block hover:shadow-lg' onClick={() =>closeModal()}>
              <svg className='inline-block px-1' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              Close Playlist
            </button>

            <div className='mt-6'>

           {playlist.length > 0 ?(
            playlist.map((music, index) =>(
                <motion.div 
                initial ={{opacity :0 ,translateX : -50}}
                animate={{opacity: 1, translateX : 0 }}
                transition={{duration : 0.3, delay: index * 0.1}}

                className='group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent'

                onClick={() => setCurrentPlaySong(music)}
                key={index}
                >

                

              <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />


              <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" - "}
                <span className="text-base">{music?.album}</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" - "}
                <span className="text-sm text-textColor font-semibold">
                {music?.genre}
                </span>
              </p>
            </div>



                </motion.div>
            ))
           ) : 
           <></>}
           </div>
        </div>
    )

}

export default MusicPlayer
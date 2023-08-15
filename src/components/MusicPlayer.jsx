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
    const [{allSongs, isSongPlaying,  songIndex }, dispath] = useStateValue();

    const [isPlayList, setIsPlayList] = useState(false);

    const nextTrack =() => {

        if (songIndex >= allSongs.length - 1) {
            dispath({
              type: actionType.SET_SONG_INDEX,
              songIndex: 0,
            });
          } else {
            dispath({
              type: actionType.SET_SONG_INDEX,
              songIndex: songIndex + 1,
            });
          }

    }

    const previousTrack =() => {

        if (songIndex === 0) {
            dispath({
              type: actionType.SET_SONG_INDEX,
              songIndex: 0,
            });
          } else {
            dispath({
              type: actionType.SET_SONG_INDEX,
              songIndex: songIndex - 1,
            });
          }
        
    }

    const closePlayer = () => {
        if (isSongPlaying) {
            dispath({
              type: actionType.SET_ISSONG_PLAYING,
              isSongPlaying: false,
            });
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
            <img src={allSongs[songIndex]?.imageURL} 
            alt='SongImage' 
            className='w-40 h-20 object-cover rounded-md' />

        <div className='flex items-start flex-col'>

            <p className='text-xl text-headingColor font-semibold'>
                {`${
                    allSongs[songIndex]?.name.length > 20
                    ? allSongs[songIndex]?.name.slice(0, 20)
                    : allSongs[songIndex]?.name
                }`}{" - "}
                <span className='text-base'>{allSongs[songIndex]?.album}</span>


            </p>

            <p className='text-textColor font-semibold text-base'>
                {allSongs[songIndex]?.artist}{" - "}
                <span className='text-sm text-textColor font-normal'>
                    {allSongs[songIndex]?.genre}

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
             src={allSongs[songIndex]?.songURL}
             onPlay={() => nowPlaying()} //add a alert for now playing
             autoPlay={true} //make true
             showSkipControls={true}
             showJumpControls={false}
             volume={0.5}
             onClickNext={nextTrack}
             onClickPrevious={previousTrack}

            />
            

        </div>
        {
            isPlayList && (
                <PlaylistCard />
            )
        }


        <IoClose 
        className='absolute -top-3 right-3 h-7 w-7 rounded-full text-white bg-orange-500 hover:bg-orange-700'
        onClick={closePlayer}/>



        </div>

    </div>
  )
}

export const PlaylistCard = () => {
    const [{allSongs, isSongPlaying,  songIndex }, dispath] = useStateValue();

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


      const setCurrentPlaySong = (index) => {
        if(!isSongPlaying){
            dispath({
              type: actionType.SET_ISSONG_PLAYING,
              isSongPlaying: true,
            })
          }
      
          if(songIndex !== index){
            dispath({
              type: actionType.SET_SONG_INDEX,
              songIndex: index,
      
            })
          }
      };



    return(
        <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll rounded-md shadow-md bg-primary'>
           {allSongs.length > 0 ?(
            allSongs.map((music, index) =>(
                <motion.div 
                initial ={{opacity :0 ,translateX : -50}}
                animate={{opacity: 1, translateX : 0 }}
                transition={{duration : 0.3, delay: index * 0.1}}

                className='group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent'

                onClick={() => setCurrentPlaySong(index)}
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
    )

}

export default MusicPlayer
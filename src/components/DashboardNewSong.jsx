import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";

import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType} from "../context/reducer";
import FilterButton from "./FilterButton";
import { filterByLanguage, filters } from "../utils/supportfunctions";

// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNewSong = () => {

const [songName, setSongName] = useState("");

const [isImageLoading, setIsImageLoading] = useState(false);

const[{allArtists, allAlbums}, dispath] = useStateValue();

useEffect(() => {
    if(!allArtists){
    getAllArtist().then((data) => {
        dispath({
        type: actionType.SET_ALL_ARTISTS,
        allArtists: data.data,
        });
        
    });
    }

     if(!allAlbums){
        getAllAlbums().then((data) => {
            dispath({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.data,
            });
            
        });
     }

}, [])


  return (
    <div className='flex flex-col items-center justify-center p-4 border-2 gap-4 border-orange-200 rounded-md'>
        <input 
        type="text" 
        placeholder="Enter Your Song Name..." 
        className=" w-full p-3 rounded-md text-base font-semibold text-textColor outline-orange-400 shadow-sm border-gray-300 "
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        />
        <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButton filterData={allArtists} flag={"Artist"}/>
            <FilterButton filterData={allAlbums} flag={"Album"}/>
            <FilterButton filterData={filters} flag={"Genre"}/>
            {/* range scale for matrix point */}
            <FilterButton filterData={filterByLanguage} flag={"Matrix point"}/>
        </div>

        <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-amber-500 cursor-pointer">
          {isImageLoading  && <FileLoader progress={10.367}/>}
          {/* {!isImageLoading && {
            
          }} */}


        </div>

    </div>
  )
};

export const FileLoader = ({progress}) => {
  return(
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="animate-bounce">
        <svg aria-hidden="true" className="inline w-20 h-20 mr-2 my-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      <span className="sr-only">Loading...</span>
</div>
    </div>
  )
};

export default DashboardNewSong
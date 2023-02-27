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

    </div>
  )
}

export default DashboardNewSong
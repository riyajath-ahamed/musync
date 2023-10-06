import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";

const DashboardSongs = () => {

  const [songFilter, setSongFilter] = useState("");
  const [isFoucs, setIsFoucs] = useState(false);
  const [{allSongs}, dispatch] = useStateValue();


  useEffect(() => {
    if(!allSongs){
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
        
      })
    }

  }, [])
  

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20 py-1 ">
        <NavLink to={"/dashboard/newSong"} className="flex items-center justify-center px-4 py-2 border-2 rounded-md border-orange-300 hover:border-orange-500 hover:shadow-md cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-orange-600">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
        </NavLink>
        {/* <svg class="absolute text-slate-400 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg> */}

        <input
          type="text"
          placeholder="Search Here....."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          className={`w-52 px-4 py-2 border-2 ${
            isFoucs ? "border-orange-500 shadow-md caret-orange-500"  : "border-orange-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold `} 
          onFocus={() => setIsFoucs(true)}
          onBlur={() => setIsFoucs(false)}
        />
        <i>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-orange-500 cursor-pointer">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
        </i>
      </div>


      {/* container */}
      <div className="relative w-full my-4 p-4 pt-14 border-2 border-orange-200 rounded-md">
        {/* count Amount */}
        <div className="absolute top-4 left-4 border border-orange-300 bg-white px-1 rounded-md shadow-md">
          <p className="text-lg font-bold">
            <span className="text-lg font-semibold text-textColor">Count : </span>
            {allSongs?.length}
          </p>

        </div>

        {/* <div>

        </div> */}
        <SongContainer data={allSongs}/>

      </div>
    </div>
  );
};

export const SongContainer = ({data}) => {
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song,i) => (
        <SongCard key={song._id}
        data={song} index={i}
        type="song"
        palace="sensitive"
        />
      ))}


    </div>
  )
    
  
}

export default DashboardSongs;

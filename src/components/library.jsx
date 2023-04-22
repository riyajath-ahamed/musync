import React, { useEffect, useState } from 'react';
import Header from './Header';
import { SongContainer } from './DashboardSongs';
import { useStateValue } from '../context/StateProvider';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import SearchBar from './SearchBar';

import { motion } from "framer-motion";
import Filter from './Filter';

const Library = () => {

  const [
    {
      searchTerm,
      isSongPlaying,
      songIndex,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      matrixpointFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);


  // useEffect(() => {
  //   if(!allSongs){
  //     getAllSongs().then((data) => {
  //       dispatch({
  //         type: actionType.SET_ALL_SONGS,
  //         allSongs: data.data,
  //       });
        
  //     })
  //   }

  // }, [])

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     const filtered = allSongs.filter(
  //       (data) =>
  //         data.artist.includes(searchTerm) ||
  //         // data.language.includes(searchTerm) ||
  //         data.name.includes(searchTerm) ||
  //         data.artist.includes(artistFilter)
  //     );
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.artist === artistFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [artistFilter]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter(
  //     (data) => data.category.toLowerCase() === filterTerm
  //   );
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [filterTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.album === albumFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [albumFilter]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter(
  //     (data) => data.matrixpoint === matrixpointFilter
  //   );
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [matrixpointFilter]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />

      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>

  )
}

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
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
          onClick={() => addSongToContext(index)}
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
  );
};

export default Library
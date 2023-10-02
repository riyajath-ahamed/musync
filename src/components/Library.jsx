import React, { useEffect, useState } from "react";
import Header from "./Header";
import { SongContainer } from "./DashboardSongs";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SearchBar from "./SearchBar";

import { motion } from "framer-motion";
import Filter from "./Filter";
import { AlbumContDrawer, ArtistContDrawer } from "./Containers";

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

  const [activeTab, setActiveTab] = useState("Songs");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const activeTabFunction = (tabName) => {
    if (activeTab === tabName) {
      return "bg-yellow-400";
    } else {
      return "bg-slate-200 hover:bg-slate-400 hover:drop-shadow-lg";
    }
  };

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.includes(searchTerm) ||
          // data.language.includes(searchTerm) ||
          data.name.includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    if (allSongs) {
      const filtered = allSongs.filter(
        (data) => data.category && data.category.toLowerCase() === filterTerm
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs([]);
    }
  }, [filterTerm, allSongs]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.matrixpoint === matrixpointFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [matrixpointFilter]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      {/* TODO : Add Tabs and create library with Artist , Album , Songs , Playlist, sserch */}

      <div className="tabs w-3/6  tabs-boxed justify-center my-5 gap-5 bg-white  border-slate-600 shadow-lg shadow-yellow-100">
        <a
          className={`tab ${activeTabFunction("Artist")}`}
          onClick={() => handleTabClick("Artist")}
        >
          Artist
        </a>
        <a
          className={`tab ${activeTabFunction("Album")}`}
          onClick={() => handleTabClick("Album")}
        >
          Album
        </a>
        <a
          className={`tab ${activeTabFunction("Songs")}`}
          onClick={() => handleTabClick("Songs")}
        >
          Songs
        </a>
        <a
          // TODO: Add components and Remove disabled
          disabled="disabled"
          className={`tab ${activeTabFunction("Playlists")} btn-disabled`}
          onClick={() => handleTabClick("Playlists")}
        >
          Playlists
        </a>
        <a
          className={`tab ${activeTabFunction("Search")}`}
          onClick={() => handleTabClick("Search")}
        >
          Search
        </a>
      </div>

      {activeTab === "Search" && (
        <>
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
            <HomeSongContainer
              musics={filteredSongs ? filteredSongs : allSongs}
            />
          </div>
        </>
      )}

      {activeTab === "Songs" && (
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
          <HomeSongContainer musics={allSongs} />
        </div>
      )}

      {activeTab === "Artist" && (
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
          <ArtistContDrawer />
        </div>
      )}

      {activeTab === "Album" && (
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
          <AlbumContDrawer />
        </div>
      )}

      {/* 
      [-] artist Containers
      [-] alubum Container
      [] Playlist Container 

      */}
    </div>
  );
};

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

export default Library;

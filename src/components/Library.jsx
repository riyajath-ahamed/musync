import React, { useEffect, useState } from "react";
import Header from "./Header";
import { SongContainer } from "./DashboardSongs";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs, removeFavoriteSong, saveFavoriteSong } from "../api";
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
      user
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
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
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
  const [{ isSongPlaying, songIndex, user }, dispatch] = useStateValue();


  useEffect(() => {
    getAllSongs().then((data) => {
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs: data.data,
      });
    });
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
  };
}

  const addfavoritesSong = (songsId, userId) =>{
    if (user && user.user.favorite.includes(songsId)){
      removeFavoriteSong(songsId, userId)
      .then((res) => {
        if(res){
          dispatch({
            
            user: {
              ...user.user,
              favorite: res.data.favorite
            },
          });
        }
      })
      return;
    } else {
    saveFavoriteSong(songsId, userId)
    .then((res) => {
      if(res){
        dispatch({
          
          user: {
            ...user.user,
            favorite: res.data.favorite
          },
        });
      }
    })
    }
  }


  const addtoPlaylist = (data) =>{
    ///work on thidss
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
      type: actionType.SET_PLAYLIST,
      songs:currentSong ,
    })
    
  }



  
  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.1, delay: index * 0.01 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col"
          
        >
          <div className="absolute z-30 dropdown dropdown-bottom dropdown-end bg-gray-100 hover:bg-white rounded-bl-xl top-1 right-1">
            <div tabIndex={0} role="button" className=" m-1 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="#697689" stroke-width="1.5" stroke-linecap="round"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {/* <li><a>Play Next</a></li> */}
              <li onClick={() =>addtoPlaylist(data)}><a>Add to Playlist</a></li>
            </ul>
          </div>
          
          

          <div className="w-48 min-w-[160px] h-48 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className=" w-full h-full rounded-lg object-cover"
              onClick={() => addSongToContext(data)}
            />
          </div>

          <p className="text-base text-headingColor font-semibold my-2 hover:underline " onClick={() => addSongToContext(data)}>
            {data.name.length > 20 ? `${data.name.slice(0, 20)} ..` : data.name}
            <span className="block text-sm text-gray-400 my-1">
              {data.artist}
            </span>
          </p>
          <p className="absolute hover:scale-150 hover:shadow-sm bottom-1 right-3 z-10 ease-in-out duration-300">
              <button className="" onClick={() => addfavoritesSong(data._id, user.user._id)}>
                {user && user.user.favorite.includes(data._id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#FF8A65"></path>
                </svg>
                ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="m13.73 3.51 1.76 3.52c.24.49.88.96 1.42 1.05l3.19.53c2.04.34 2.52 1.82 1.05 3.28l-2.48 2.48c-.42.42-.65 1.23-.52 1.81l.71 3.07c.56 2.43-.73 3.37-2.88 2.1l-2.99-1.77c-.54-.32-1.43-.32-1.98 0l-2.99 1.77c-2.14 1.27-3.44.32-2.88-2.1l.71-3.07c.13-.58-.1-1.39-.52-1.81l-2.48-2.48c-1.46-1.46-.99-2.94 1.05-3.28l3.19-.53c.53-.09 1.17-.56 1.41-1.05l1.76-3.52c.96-1.91 2.52-1.91 3.47 0Z" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                )}
              </button>
            </p>
        </motion.div>
      ))}
    </>
  );
};

export default Library;

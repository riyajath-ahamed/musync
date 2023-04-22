import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";

import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import FilterButton from "./FilterButton";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm , allArtists , allAlbums, genreFilter }, dispath] = useStateValue();

  useEffect(() => {
    if(!allArtists){
        getAllArtist().then((data) => {
            dispath({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.data,
          });
          
        })
      }

    if(!allAlbums){
        getAllAlbums().then((data) => {
            dispath({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.data,
          });
          
        })
      }
  }, []);

  const updateFilter = (value) => {
    dispath({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispath({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    //dispath({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    dispath({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispath({ type: actionType.SET_MATRIXPOINT_FILTER , matrixpointFilter: null });
  };
  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      <FilterButton filterData={allArtists} flag={"Artist"} />

      {/* <div className=" flex items-center gap-6 mx-4">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div> */}

      <FilterButton filterData={allAlbums} flag={"Album"}/>

      <FilterButton filterData={filterByLanguage} flag={"Matrix point"}/>

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}

      >
        <abbr title="Clear">
        <MdClearAll className="text-textColor text-xl cursor-pointer" />
        </abbr>
      </motion.i>
    </div>
  );
};

export default Filter;
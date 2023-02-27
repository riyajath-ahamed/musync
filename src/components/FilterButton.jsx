import React,{useState} from 'react'
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const FilterButton = ({filterData, flag}) => {

  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [{artistFilter, albumFilter,filterTerm, genreFilter, matrixpointFilter}, dispatch] = useStateValue();


  const updaterFilterButton = (name) => {
    setFilterMenu(false);
    setFilterName(name);

    if(flag === "Artist"){
      dispatch({
        type : actionType.SET_ARTIST_FILTER,
        artistFilter: name
      })
    }

    if(flag === "Album"){
      dispatch({
        type : actionType.SET_ALBUM_FILTER,
        albumFilter: name
      })
    }

    if(flag === "Matrix point"){
      dispatch({
        type : actionType.SET_MATRIXPOINT_FILTER,
        matrixpointFilter: name
      })
    }

    if(flag === "Genre"){
      dispatch({
        type : actionType.SET_GENRE_FILTER,
        genreFilter: name
      })
    }

  }

  return (
    <div className='border border-orange-400 rounded-md px-4 py-1 relative cursor-pointer hover:border-orange-500' onClick={() => setFilterMenu(!filterMenu)}>
      <p className='text-base tracking-wide text-textColor flex font-semibold items-center gap-2' >

        {!filterName && flag} 
        {filterName && (
          <>
          {
            filterName.length >  12 ? `${filterName.slice(0,12)}..` : filterName
          }
          </>
        )}
        <IoChevronDown 
        className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}`}
        />

      </p>
      {filterData && filterMenu &&(
        <motion.div 
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 50}}
        className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-tray-gray-200 py-4 flex flex-col rounded-md shadow-md absolute top-8 -left-5">
        {filterData?.map((data) => (
          <div key={data.name} className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
          onClick={() => {updaterFilterButton(data.name)}}
          >

            {
              (flag === "Artist" || flag === "Album") && (
                <img 
                src={data.imageURL} className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                />

              )
            }
            <p className='w-full text-textColor font-semibold text-base'>
              {data.name.length > 12 ? `${data.name.slice(0,12)}..` : data.name}

            </p>


          </div>
        ))}

      </motion.div>
      )}
    </div>
  )
}

export default FilterButton
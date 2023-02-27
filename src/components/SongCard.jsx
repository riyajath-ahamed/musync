import React from 'react'
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

//add lazy loading to images and text

const SongCard = ({data, index}) => {
  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col '>
      <div className='w-48 min-w-[160px] h-48 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden items-center'>
        <motion.img
        whileHover={{ scale: 1.05 }}
        src={data.imageURL} alt={data.name} className='w-full h-full rounded-lg object-cover' />

      </div>
      <p className='text-base text-headingColor font-semibold my-2 '>
      {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : `${data.name}`}
      <span className='block text-sm text-gray-400 my-1'>
      
        {data.artist.length > 25 ? `${data.artist.slice(0, 25)}...` : `${data.artist}`}
        </span>
      </p>

      {/* can replace with a option dropdown usinfg headless ui in tailwind css 
      https://headlessui.com/react/tabs */}

      <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4  '>


        <motion.i 
        whileTap={{scale : 0.75}}
        className='text-base rounded-md text-red-500 drop-shadow-md hover:text-white hover:bg-red-700'>
          <MdDelete/>
        </motion.i>
      </div>
      

        

      
      

    </motion.div>
  )
}

export default SongCard
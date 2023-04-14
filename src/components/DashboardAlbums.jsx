import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getAllAlbums } from '../api';
import SongCard from './SongCard';

const DashboardAlbums = () => {

  const [{allAlbums}, dispatch] = useStateValue();

  useEffect(() => {
    //DATA. DATA ERROR IN USEEFFECT
    if(!allAlbums){
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          all: data.data,
        });
        
      })
    }

  }, [])

  return (
    <div>
      <div className='w-full p-4 flex items-center justify-center flex-col'>
      
      <div className="relative w-full my-4 p-4 pt-14 border-2 border-orange-200 rounded-md">
        
        <AlbumContainer data={allAlbums}/>

      </div>

    </div>
    </div>
  )
}


export const AlbumContainer = ({data}) => {
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song,i) => (
        <SongCard key={song._id}
        data={song} index={i}
        type="album"
        />
      ))}


    </div>
  )
    
  
}

export default DashboardAlbums
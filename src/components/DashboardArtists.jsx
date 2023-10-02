import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllArtist } from '../api';
import { actionType } from '../context/reducer';
import SongCard from './SongCard';

const DashboardArtists = () => {

  const [{allArtists}, dispatch] = useStateValue();

  useEffect(() => {
    //DATA. DATA ERROR IN USEEFFECT
    if(!allArtists){
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
        
      })
    }

  }, [])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      
      <div className="relative w-full my-4 p-4 pt-14 border-2 border-orange-200 rounded-md">
        
        <ArtistContainer data={allArtists}/>

      </div>

    </div>
  )
}

export const ArtistContainer = ({data}) => {
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song,i) => (
        <SongCard key={song._id}
        data={song} index={i}
        type="artist"
        palace="sensitive"
        />
      ))}


    </div>
  )
    
  
}


export default DashboardArtists
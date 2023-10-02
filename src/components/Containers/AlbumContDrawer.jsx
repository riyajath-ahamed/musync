import React, { useEffect } from 'react'
import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums } from '../../api';
import { actionType } from '../../context/reducer';
import SongCard from '../SongCard';

const AlbumContDrawer = () => {

    const [{allAlbums}, dispatch] = useStateValue();

    useEffect(() => {
      //DATA. DATA ERROR IN USEEFFECT
      if(!allAlbums){
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.data,
          });
          
        })
      }
  
    }, [])

  return (
    <div><div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
    {allAlbums && allAlbums.map((song,i) => (
      <SongCard key={song._id}
      data={song} index={i}
      type="album"
      />
    ))}


  </div></div>
  )
}

export default AlbumContDrawer
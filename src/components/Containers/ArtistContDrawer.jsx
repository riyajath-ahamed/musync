import React, { useEffect } from 'react'
import SongCard from '../SongCard'
import { useStateValue } from '../../context/StateProvider';
import { getAllArtist } from '../../api';
import { actionType } from '../../context/reducer';
import PopupModal from './PopupModal';

const ArtistContDrawer = () => {

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
    <div>
        <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
    {allArtists && allArtists.map((song,i) => (
      <SongCard key={song._id}
      data={song} index={i}
      type="artist"
      />
    ))}


  </div>
  {PopupModal()}
  </div>
  )
}

export default ArtistContDrawer
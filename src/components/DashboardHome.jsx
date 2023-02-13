import React,{useEffect} from 'react'
import { getAllUsers, getAllSongs,getAllArtist, getAllAlbums } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri"
import { bgColors, cardColor } from '../utils/styles';


export const DashboardCard = ({icon, name, count}) => {


  const bg_color = cardColor[parseInt(Math.random() * bgColors.length)];

  return(
    <div 
    
    className= {bg_color}>
      {icon}
      <p className='text-xl text-white font-semibold'>{name}</p>
      <p className='text-xl text-white '>{count}</p>
    </div>
  )

};

const DashboardHome = () => {

  const [{allUsers,allSongs,allArtists,allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    //All user count
    if (!allUsers) {
      getAllUsers().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
      
    };

    //all songs count
    if (!allSongs) {
      getAllSongs().then((data) => {
        // dispatch({
        //   type: actionType.SET_ALL_SONGS,
        //   allSongs: data.data,
        // });
        console.log(data);
      });
    };

    if (!allArtists) {
      getAllArtist().then((data) => {
        // dispatch({ type: actionType.SET_ALL_ARTISTS, artists: data.data });
        console.log(data);
      });
    };

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        // dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
        console.log(data);
      });
    };
    // eslint-disable-next-line


  }, [])
  

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      
        <DashboardCard icon={<FaUsers className="text-3xl text-white" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0}/>
        <DashboardCard icon={<GiLoveSong className="text-3xl text-white" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />
        <DashboardCard icon={<RiUserStarFill className="text-3xl text-white" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
        <DashboardCard icon={<GiMusicalNotes className="text-3xl text-white" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0}/>
      

    </div>
  )
}

export default DashboardHome
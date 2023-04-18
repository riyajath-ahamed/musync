import React,{useCallback, useEffect, useRef, useState} from 'react'
import { getAllUsers, getAllSongs,getAllArtist, getAllAlbums } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri"
import { bgColors, cardColor } from '../utils/styles';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';


export const DashboardCard = ({icon, name, count}) => {


  const bg_color = cardColor[parseInt(Math.random() * bgColors.length)];

  return(
    <div 
    
    className= {bg_color}>
      {icon}
      <p className='text-xl text-white font-semibold '>{name}</p>
      <p className='text-xl text-white '>{count}</p>
    </div>
  )

};

const sdk = new ChartsEmbedSDK({
  baseUrl: 'https://charts.mongodb.com/charts-project-0-uoxvc',
});

// embed a chart
const chart = sdk.createChart({
chartId: '63f0dee2-ad08-4c02-8bd6-243a65de512d',
autoRefresh : true,


});

const wordchart = sdk.createChart({
  chartId: '63f30435-3f54-4215-8be1-affaab72407a',
  autoRefresh : true,
  
  
  });


 
const DashboardHome = () => {

  const [{allUsers,allSongs,allArtists,allAlbums }, dispatch] = useStateValue();

  

  useEffect(() => {
    //All user count
    if (!allUsers) {
      getAllUsers().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        })
      })
      
    }

    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({ 
          type: actionType.SET_ALL_ARTISTS, 
          allArtists: data.data });
        
      })
    }


    //all songs count
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data
        })
        
      })
    }

    
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ 
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data });
        
      })
    }

    // if statment for the chart refewashing issue

    chart
    .render(document.getElementById('chart'))
    .catch();

    wordchart
    .render(document.getElementById('wchart'))
    .catch();


  }, [
    
  ])
  

  return (
    <div>
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      
        <DashboardCard icon={<FaUsers className="text-3xl text-white" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0}/>
        <DashboardCard icon={<GiLoveSong className="text-3xl text-white" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />
        <DashboardCard icon={<RiUserStarFill className="text-3xl text-white" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
        <DashboardCard icon={<GiMusicalNotes className="text-3xl text-white" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0}/>

    </div>

    {/* charts */}
    <div className='w-full bg-white rounded-md flex flex-wrap justify-evenly'>
    <div id='chart' style={{ width: 300, height: 300}} className="rounded-lg  hover:shadow-orange-500"></div>
    <div id='wchart' style={{ width: 300, height: 300}} className="rounded-lg  hover:shadow-orange-500"></div>
    </div>
    </div>

  )
}

export default DashboardHome
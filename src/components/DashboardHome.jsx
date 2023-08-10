import React,{useCallback, useEffect, useRef, useState} from 'react'
import { getAllUsers, getAllSongs,getAllArtist, getAllAlbums } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


import { FaUser } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri"

import { IoIosAlbums } from "react-icons/io"

import { bgColors, cardColor } from '../utils/styles';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';



export const DashboardCard = ({icon, name, count}) => {


  const bg_color = cardColor[parseInt(Math.random() * bgColors.length)];

  return(
    <div 
    
    className= "bg-white p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center">
      {icon}
      <p className={`${bg_color} text-2xl font-bold`} >{name}</p>
      <p className='text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium'>{count}</p>
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
        <DashboardCard icon={<FaUser className="text-3xl text-slate-300 drop-shadow-md" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0}/>
        <DashboardCard icon={ songicon} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />
        <DashboardCard icon={<RiUserStarFill className="text-3xl text-slate-300 drop-shadow-md" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
        <DashboardCard icon={<IoIosAlbums className="text-3xl text-slate-300 drop-shadow-md" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0}/>
        <div className="stats shadow">
  
  <div className="stat my-6 py-5">
    <div className="stat-figure text-orange-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </div>
    <div className="stat-title">Total Users</div>
    <div className="stat-value text-orange-500">{allUsers?.length > 0 ? allUsers?.length : 0}</div>
    <div className="stat-desc"></div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-yellow-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div className="stat-title">Songs</div>
    <div className="stat-value text-yellow-500">{allSongs?.length > 0 ? allSongs?.length : 0}</div>
    <div className="stat-desc"></div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div className="stat-value">86%</div>
    <div className="stat-title">Tasks done</div>
    <div className="stat-desc text-secondary">31 tasks remaining</div>
  </div>
  
</div>
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

export const songicon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-300 drop-shadow-md">
<path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" clipRule="evenodd" />
</svg>


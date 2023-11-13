import React, { useEffect } from 'react'
import Header from './Header'
import Hero from './Hero'
import { NavLink } from 'react-router-dom'
import { SongContainer } from './DashboardSongs'
import { useStateValue } from '../context/StateProvider'

import { actionType } from '../context/reducer'
import { getAllNewSongs, getAllSongs } from '../api'
import SongContainerDrawer from './songContainerDrawer'

const Home = () => {

const [{newSongs}, dispatch] = useStateValue();

  useEffect(() => {
      getAllNewSongs().then((data) => {
        dispatch({
          type: actionType.SET_NEW_SONGS,
          newSongs: data.data,
        });
        
      })
  }, [])


  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary scroll-smooth'>
      <Header/>
      <p className='text-7xl font-bold '>Let The <span className='bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-8xl font-bold hover:drop-shadow-lg hover:shadow-yellow-600/60'>Music </span></p>
      <p className='text-8xl font-bold'> <span className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent '>Move</span> You !</p>
      <p className='mb-6 font-light text-3xl text-gray-500'>Feel the beat of your emotions with personalized playlists</p>
      
      <div className='w-full h-auto flex flex-col sm:flex-row items-center justify-center bg-primary gap-6' >
        <Hero/>
        <NavLink
            to={"/library"}
            className="md:visible"
          >
        <div className='bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 ease-in-out delay-150 h-340 w-275 rounded-lg transition shadow-lg shadow-pink-600/60'
        
        >
          <div className='flex flex-col items-start p-11 justify-center h-full w-full text-white text-4xl font-bold hover:animate-pulse'>
            Move <span>To</span> <span className='text-5xl'>Library</span>
          </div>
        </div>
        </NavLink>
        
      </div>

      <div className='flex flex-row pt-10  w-880 items-start justify-start'>
        <p className='text-left text-3xl font-bold items-start right-6'>New Release</p>
      </div>

      <div className='flex flex-wrap gap-5 pb-5 items-center scroll-pl-6 snap-center snap-always justify-center w-full overflow-x-auto'>
       <SongContainerDrawer musics={newSongs} drawerName={"home"} className="scroll-ml-6 scroll-pl-6 snap-center snap-always overflow-x-auto snap-x" />

      </div>

      <footer className="footer items-center p-4 bg-orange-100 text-black">
  <aside className="items-center grid-flow-col">

    <p>Copyright © 2023 - All right reserved</p>
  </aside> 
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
    </a> 
    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
  </nav>
</footer>
      
    </div>
  )
}

export default Home
import React, { useEffect } from 'react'
import Header from './Header'
import { useStateValue } from '../context/StateProvider';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { all } from 'axios';




const Favorites = () => {
    const [{user }, dispatch] = useStateValue();
  return (
    
    <div className='w-full flex items-center justify-evenly flex-wrap'>
        <Header />


        <div class="flex flex-wrap -mx-3 mb-5">
  <div class="w-full max-w-full px-3 mb-6  mx-auto">
    <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
      <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
    
        <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
          <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
            <span class="mr-3 font-semibold text-dark">My Favorite Songs</span>
            <span class="mt-1 font-medium text-secondary-dark text-lg/normal"></span>
          </h3>
          <div class="relative flex flex-wrap items-center my-2">
            
          </div>
        </div>
       
        <div class="flex-auto block py-8 pt-6 px-9">
        <div className="overflow-x-auto h-685 w-full">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                   user && user.user.favorite.map((fav) => (
                        FavoriteRow(fav)
                    ))
                }
                
                
                </tbody>
                {/* foot */}
                <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th></th>
                </tr>
                </tfoot>
                
            </table>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
    
  )
}

export default Favorites

export const FavoriteRow = (fav) =>{

    const [{user, allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });
    }, []);

    const song = allSongs && allSongs.find((song) => song._id === fav);

    {
        if(song){

            return(

                <tr>
                    <th>
                    
                    </th>
                    <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={song.imageURL} alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                        <div className="font-bold">{song.name}</div>
                        <div className="text-sm opacity-50">{song.artist}</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    {song.album}
                    <br/>
                    <span className="badge badge-ghost badge-sm">Postive Rating -{song.positiveRating} Exciting Rating -{song.excitingRating}</span>
                    </td>
                    <td>{song.genre}</td>
                    <th>
                    
                    </th>
                </tr>
                )

        }
    }
    
}
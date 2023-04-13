import React, { useEffect,  useState } from "react";
import {
 
  ref,
 
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";

import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSongs,
} from "../api";
import { actionType} from "../context/reducer";
import FilterButton from "./FilterButton";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FileUploader from "./FileUploader";
import DisabledButton from "./DisabledButton";

// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNewSong = () => {



const [songName, setSongName] = useState("");


//iamge Cover state
const [songImageCover, setsongImageCover] = useState(null);
const [imageUploadProgress, setImageUploadProgress] = useState(0);
const [isImageLoading, setIsImageLoading] = useState(false);

//audio file state
const [audioImageCover, setAudioImageCover] = useState(null);
const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
const [isAudioLoading, setIsAudioLoading] = useState(false);

//artist save states
const [artistImageCover, setArtistImageCover] = useState(null);
const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
const [isArtistUploading, setIsArtistUploading] = useState(false)

const [artistName, setArtistName] = useState("");
const [instagram, setInstagram] = useState("");


//Album save states
const [albumImageCover, setAlbumImageCover] = useState(null);
const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
const [isAlbumUploading, setIsAlbumUploading] = useState(false);

const [albumName, setAlbumName] = useState("");



const[
  {
    allArtists, 
    allAlbums, 
    artistFilter, 
    albumFilter, 
    
     allSongs,  
     genreFilter, 
     matrixpointFilter, 
     alertType
    }, dispath] = useStateValue();

useEffect(() => {
    if(!allArtists){
    getAllArtist().then((data) => {
        dispath({
        type: actionType.SET_ALL_ARTISTS,
        allArtists: data.data,
        });
        
    });
    }

     if(!allAlbums){
        getAllAlbums().then((data) => {
            dispath({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.data,
            });
            
        });
     }

}, [])

 const deleteFileObject = (url, isImage) => {

  //Alldeleteing error

  if(isImage){
    setIsImageLoading(true)
    setIsAudioLoading(true)
    setIsArtistUploading(true)
    setIsAlbumUploading(true)
    dispath({ 
      type: actionType.SET_ALERT_TYPE, 
      alertType: "Success" 
    });

    // setInterval(() => {

    //   dispath({ 
    //   type: actionType.SET_ALERT_TYPE, 
    //   alertType: null
    // });
      
    // }, 4000);

    // set time out()
    setTimeout(() =>{
      dispath({ 
          type: actionType.SET_ALERT_TYPE, 
          alertType: null
        });
        }, 2000

    );
    
    }


    // repeating the delete functionfor every image and song

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {

      dispath({ 
        type: actionType.SET_ALERT_TYPE, 
        alertType: "warning" 
      }); 

      // setInterval(() => {

      //   dispath({ 
      //   type: actionType.SET_ALERT_TYPE, 
      //   alertType: null
      // });
        
      // }, 4000);

      setsongImageCover(null);
      setAudioImageCover(null);
      setArtistImageCover(null);
      setAlbumImageCover(null);

      

      setIsImageLoading(false);
      setIsAudioLoading(false);
      setIsArtistUploading(false);
      setIsAlbumUploading(false);
      
    })



}

const saveSong = () => {

  if(!songImageCover || !audioImageCover){
    //alert
    dispath({ 
      type: actionType.SET_ALERT_TYPE, 
      alertType: "error" 
    }); 

    // setInterval(() => {

    //   dispath({ 
    //   type: actionType.SET_ALERT_TYPE, 
    //   alertType: null
    // });
    // }, 4000);

    setTimeout(() =>{
      dispath({ 
          type: actionType.SET_ALERT_TYPE, 
          alertType: null
        });
        }, 2000

    );






  }else {
    //save to database
    setIsAudioLoading(true);
    setIsImageLoading(true);

    const data = {
      name: songName,
      imageURL: songImageCover,
      songURL: audioImageCover,
      album: albumFilter,
      artist: artistFilter,
      genre:genreFilter,
      matrixpoint: matrixpointFilter,

    };

    saveNewSongs(data).then((res) => {
      getAllSongs().then((songs) =>{
        dispath({
          type: actionType.SET_ALL_SONGS,
          allSongs: songs.data
        })
      }
        )
        
      }
    )

    dispath({ 
      type: actionType.SET_ALERT_TYPE, 
      alertType: "success" 
    }); 

    // setInterval(() => {

    //   dispath({ 
    //   type: actionType.SET_ALERT_TYPE, 
    //   alertType: null
    // });
      
    // }, 4000);
    setTimeout(() =>{
      dispath({ 
          type: actionType.SET_ALERT_TYPE, 
          alertType: null
        });
        }, 2000

    );




      setSongName(null)
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setsongImageCover(null);
      setAudioImageCover(null);
      dispath({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispath({ type: actionType.SET_GENRE_FILTER, genreFilter: null });
      dispath({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispath({ type: actionType.SET_MATRIXPOINT_FILTER, matrixpoint: null });



  }

};

const saveArtist =() =>{
   if(!artistImageCover || !artistName || !instagram){


     //alert
   }else{
    setIsArtistUploading(true);
    const data = {
      name: artistName,
      imageURL: artistImageCover,
      instagram: `https://www.instagram.com/${instagram}`,
    }

    saveNewArtist(data).then((res) => {
      getAllArtist().then((data) => {
        dispath({ 
          type: actionType.SET_ALL_ARTISTS, 
          allArtists: data.data });
        
      })
        
      }
    )

    
    setIsArtistUploading(false);
    setArtistImageCover(null);
    setArtistName("");
    setInstagram("");



   }

};

const saveAlbum = () => {

  if(!albumImageCover || !albumName){
    //alert
  }else{
    // saveNewAlbum
    setIsAlbumUploading(true);
    const data ={
    name: albumName,
    imageURL: albumImageCover,
    }

    saveNewAlbum(data) .then(() => {

      getAllAlbums().then((data) => {
        dispath({ 
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data });
        
      })

    })


    setIsAlbumUploading(false);
    setAlbumImageCover(null);
    setAlbumName(""); 



  }

};


  return (
    <div className="flex flex-row items-start justify-center w-full h-full gap-1">
    <div className='flex flex-col items-center justify-center w-2/3 h-full p-4 border-2 gap-4 border-orange-200 rounded-md'>
        <input 
        type="text" 
        placeholder="Enter Your Song Name..." 
        className=" w-full p-3 rounded-md text-base font-semibold text-textColor outline-orange-400 shadow-sm border-gray-300 "
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        />
        <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButton filterData={allArtists} flag={"Artist"}/>
            <FilterButton filterData={allAlbums} flag={"Album"}/>
            <FilterButton filterData={filters} flag={"Genre"}/>
            {/* range scale for matrix point */}
            <FilterButton filterData={filterByLanguage} flag={"Matrix point"}/>

            


            {/* <div className="flex flex-row gap-3 border border-orange-400 rounded-md px-4  hover:border-orange-500"> 
            <p className="text-base tracking-wide text-textColor flex font-semibold items-center gap-2">Matrix Point</p>
            <div>
                <div class="flex justify-between w-full">
                <div>0</div>
                <div>10</div>
                </div>
              <input type="range" class="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-200 disabled:cursor-not-allowed" />
            </div>
            <div>
                <div class="flex justify-between w-full">
                <div>0</div>
                <div>10</div>
                </div>
              <input type="range" class="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-200 disabled:cursor-not-allowed" />
            </div>
           </div> */}


        </div>

        {/* song Image Uploading */}

        <div className="bg-card backdrop-blur-md w-full h-225 rounded-md border-2 border-dotted border-amber-500 cursor-pointer">
          {isImageLoading  && <FileLoader progress={imageUploadProgress}/>}
          {!isImageLoading && (
            <>
            {!songImageCover ? (
              <FileUploader 
                updateState={setsongImageCover} 
                setProgress={setImageUploadProgress} 
                isloading={setIsImageLoading}
                isImage= {true}
              />
            ) : (
              <div className="relative w-full h-full  overflow-hidden rounded-md   ">
                <img src={songImageCover} className="h-full object-cover" alt="cover" />

                <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:bg-red-700 hover:shadow-md duration-200 transition-all ease-in-out"
                onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className="text-white"/>
                </button>
              </div>
            )}
            </>
          )}


        </div>


        {/* Audio file upload */}
        <div className="bg-card backdrop-blur-md w-full h-225 rounded-md border-2 border-dotted border-amber-500 cursor-pointer">
          {isAudioLoading  && <FileLoader progress={audioUploadingProgress}/>}
          {!isAudioLoading && (
            <>
            {!audioImageCover ? (
              <FileUploader 
                updateState={setAudioImageCover} 
                setProgress={setAudioUploadingProgress} 
                isloading={setIsAudioLoading}
                isImage= {false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md   ">
               
                <audio src={audioImageCover} controls />

                <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:bg-red-700 hover:shadow-md duration-200 transition-all ease-in-out"
                onClick={() => deleteFileObject(audioImageCover, false)}
                >
                  <MdDelete className="text-white"/>
                </button>
              </div>
            )}
            </>
          )}


        </div>

        <div className="flex items-center justify-center w-60 cursor-pointer p-4">

          {
            isImageLoading || isAudioLoading ? (
              <DisabledButton/>
            ) :(
              <motion.button whileTap={{scale : 0.75}} className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveSong}
              >
                Save Song
              </motion.button>
              
            )
          }


        </div>
        <p className="text-base font-semibold text-textColor">
          *Note: Please upload song cover image and song file before saving song.
        </p>

        </div>

        {/* Image uploader for artist */}
        <div className='flex flex-col items-center justify-center w-1/3 h-full p-4 border-2 gap-4 border-orange-200 rounded-md'>

        <p className="text-xl font-semibold text-headingColor">Artist Details</p>
        <div className="bg-card backdrop-blur-md w-full h-150 rounded-md border-2 border-dotted border-amber-500 cursor-pointer">
          {isArtistUploading  && <FileLoader progress={artistUploadingProgress}/>}
          {!isArtistUploading && (
            <>
            {!artistImageCover ? (
              <FileUploader 
                updateState={setArtistImageCover} 
                setProgress={setArtistUploadingProgress} 
                isloading={setIsArtistUploading}
                isImage= {true}
              />
            ) : (
              <div className="relative w-full h-full  overflow-hidden rounded-md   ">
                <img src={artistImageCover} className="h-full object-cover" alt="cover" />

                <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:bg-red-700 hover:shadow-md duration-200 transition-all ease-in-out"
                onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-white"/>
                </button>
              </div>
            )}
            </>
          )}


        </div>

        {/* Artist Name input */}
        <input 
        type="text" 
        placeholder="Enter the Artist Name..." 
        className=" w-full p-2 rounded-md text-base font-semibold text-textColor outline-orange-400 shadow-sm border-gray-300 "
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        />

        {/* Artist Instagram */}

        <div className="flex w-full bg-white items-center rounded-md text-textColor p-2 outline-orange-400 border-gray-300 ">
              
              <p className="text-base font-semibold text-gray-400">www.instagram.com/</p>
              <input type="text"  placeholder="your instagram ID" 
              className="w-full text-base font-semibold text-textColor outline-none bg bg-transparent border-none"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}

              />


        </div>

        <div className="flex items-center justify-center w-60 cursor-pointer p-3">

          {
            isArtistUploading ? (
              <DisabledButton/>
            ) :(
              <motion.button whileTap={{scale : 0.75}} className="px-8 pb-2 pt-1 rounded-md text-white bg-red-600 hover:shadow-lg"
              onClick={saveArtist}
              >
                Save Artist
              </motion.button>
              
            )
          }


        </div>

        {/* Album details */}

        {/* Album Image uploader */}
        <p className="text-xl font-semibold text-headingColor">Album Details</p>
        <div className="bg-card backdrop-blur-md w-full h-150 rounded-md border-2 border-dotted border-amber-500 cursor-pointer">
          {isAlbumUploading  && <FileLoader progress={albumUploadingProgress}/>}
          {!isAlbumUploading && (
            <>
            {!albumImageCover ? (
              <FileUploader 
                updateState={setAlbumImageCover} 
                setProgress={setAlbumUploadingProgress} 
                isloading={setIsAlbumUploading}
                isImage= {true}
              />
            ) : (
              <div className="relative w-full h-full  overflow-hidden rounded-md   ">
                <img src={albumImageCover} className="h-full object-cover" alt="cover" />

                {/* classify in to album art and album cover */}

                <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:bg-red-700 hover:shadow-md duration-200 transition-all ease-in-out"
                onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-white"/>
                </button>
              </div>
            )}
            </>
          )}


        </div>

        {/* Album Name */}
        <input 
        type="text" 
        placeholder="Enter the Album Name..." 
        className=" w-full p-2 rounded-md text-base font-semibold text-textColor outline-orange-400 shadow-sm border-gray-300 "
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        />

        <div className="flex items-center justify-center w-60 cursor-pointer p-4">

        {
          isArtistUploading ? (
            <DisabledButton/>
          ) :(
            <motion.button whileTap={{scale : 0.75}} className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
            onClick={saveAlbum}
            >
              Save Album
            </motion.button>
    
          )
        }


</div>
</div>

  



    
    </div>
  )
};

export const FileLoader = ({progress}) => {
  return(
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="animate-bounce">
        <svg aria-hidden="true" className="inline w-20 h-20 mr-2 my-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      <span className="sr-only">Loading...</span>
</div>
    </div>
  )
};

export default DashboardNewSong
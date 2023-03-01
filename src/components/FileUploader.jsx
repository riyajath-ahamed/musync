import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { storage } from "../config/firebase.config";

const FileUploader = ({updateState, setProgress, isloading, isImage }) => {

    const uploadFile = (e) => {

        isloading(true) ; // set the loading state to true

        const uploadedfile = e.target.files[0];

        console.log(uploadedfile);

        const storageRef = ref(storage, `${isImage ? "coverImage" : "songs"}/${Date.now()}-${uploadedfile.name}`);

        const uploadTask = uploadBytesResumable(storageRef, uploadedfile);
        
        uploadTask.on(
            "state_changed", 
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    updateState(downloadURL);
                    isloading(false) // set the loading state to false
                })
            })

    }
  return (
    <label>
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='flex flex-col justify-center items-center cursor-pointer'>
                <p className='font-bold text-2xl'>
                    <BiCloudUpload/>
                </p>
                <p className='text-lg'>Click To Upload {isImage ? "the Song Cover Image": "the audio"}</p>
            </div>

        </div> 
        <input 
            type="file" 
            name='upload-file' 
            accept={`${isImage ? "image/*" : "audio/*"}`}
            className="w-0 h-0"
            onChange={uploadFile}
            />
        
    </label>
  )
}

export default FileUploader
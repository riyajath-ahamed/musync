import React from 'react'
import Header from './Header'
import { loadModels } from './Utils/emotionApi';
import Camera from './Utils/Camera/Camera';

const face = () => {
  loadModels();

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-primary'> 
    <Header/>
    <div className='flex flex-row w-full h-full p-5 gap-4 bg-primary items-center justify-center '>
      <Camera className='rounded-lg' photoMode={false} />
    </div>
    </div>
  )
}

export default face


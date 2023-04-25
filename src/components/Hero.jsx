import React from 'react'
import { Sliderify } from "react-sliderify";
import Hero1 from "../Asset/hero1.jpg"
import Hero2 from "../Asset/hero2.jpg"

const Hero = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
        <Sliderify rounded={true} showNavDots={false} showNavButtons={false}>
        <div style={{width: "500px", backgroundColor: "red", color: "white" }}>
            <img src={Hero1} alt="hero1" />
        </div>
        {/* <div style={{width: "500px", backgroundColor: "red", color: "white" }}>
            <img src={Hero2} alt="hero2" />
        </div> */}
        </Sliderify>

    </div>
  )
}

export default Hero
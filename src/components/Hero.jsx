import React from 'react'
import { Sliderify } from "react-sliderify";
import Hero1 from "../Asset/hero1.jpg"
import Hero2 from "../Asset/hero2.jpg"
import Hero3 from "../Asset/hero3.jpg"
import Hero4 from "../Asset/hero4.jpg"
import Hero5 from "../Asset/hero5.jpg"

const Hero = () => {
  return (
    <div >
        <Sliderify rounded={true} showNavDots={false} showNavButtons={false} className='w-656'>
        <div style={{ backgroundColor: "red", color: "red" }}>
            <img src={Hero1} alt="hero1" />
        </div>
        <div style={{ backgroundColor: "red", color: "white" }}>
            <img src={Hero2} alt="hero2" />
        </div>
        <div style={{ backgroundColor: "red", color: "white" }}>
            <img src={Hero3} alt="hero3" />
        </div>
        <div style={{ backgroundColor: "red", color: "white" }}>
            <img src={Hero4} alt="hero4" />
        </div>
        <div style={{ backgroundColor: "red", color: "white" }}>
            <img src={Hero5} alt="hero5" />
        </div>
        </Sliderify>

    </div>
  )
}

export default Hero
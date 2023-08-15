import React, { useState, useEffect, useRef } from "react";
import classnames from 'classnames';

import { detectFaces, drawResults } from "../emotionApi";

//import Results from '../Results/Results';
import Webcam from "react-webcam";

import "./Camera.css";

const Camera = ({ photoMode }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [results, setResults] = useState([]);
  console.log(results);

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      await drawResults(
        camera.current.video,
        cameraCanvas.current,
        faces,
        "boxLandmarks"
      );
      setResults(faces);
    }
  };

  const clearOverlay = (canvas) => {
    canvas.current.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, [photoMode]);

  return (
    <div className="camera">
      <p className="scroll_down text-base font-semibold text-black"> Please use a Clear Enviroment</p>
      <div className="camera__wrapper">
        <Webcam className="rounded-xl" audio={false} ref={camera} width="100%" height="auto" />
        <canvas className={classnames('webcam-overlay', photoMode && 'webcam-overlay--hidden')} ref={cameraCanvas} />
      </div>
      <div className="results__container">
      
      <ResultInfo results={results}/>

      </div>
    </div>
  );
};


export const ResultInfo = ({ results }) => {
  if (results.length <= 0) {
    return <span className="loading loading-spinner text-warning loading-lg"></span>;
  }

  if (results && results.length > 0) {
    <div>
      <p>Emotion {results[0].expressions?.asSortedArray()[0].expression}</p>
      <p>You seem to be {Math.round(results[0].age)} years old</p>
      <p>I think you are a {results[0].gender}</p>
    </div>;
  }
};

export default Camera;



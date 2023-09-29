import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";

import { detectFaces, drawResults } from "../emotionApi";

import Webcam from "react-webcam";

import "./Camera.css";

const Camera = ({ photoMode, closeCamera, handleEmotion }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [results, setResults] = useState([]);
  const [currentEmotion, setCurrentEmotion] = useState("");
  
  console.log(results);

  const emotionRead = [];

  const addRecord = (emotion) => {
    emotionRead.push(emotion);
  }
   
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
      if (faces && faces[0] && faces[0].expressions) {
        const sortedArray = faces[0].expressions.asSortedArray();
        if (sortedArray.length > 0) {
          const expression = sortedArray[0].expression;
          console.log("****************************************333333",expression);
          addRecord(expression);

        } else {
          // Handle the case where the sorted array is empty
          //TODO: alert("No emotion detected");
        }
      } else {
        // Handle the case where results, results[0], or results[0].expressions is undefined
        //TODO: alert("No emotion detected");
      }
    }
    setTimeout(() => {
        stopCamera();
    }, 5000);
  };

  /** 
   * to clear the overlay and build the algorithm to generate the playlist according to the emotion that caputure in the camera
   * 
   *  [] 
   *  []
   *  []
   *  []
   *  []
   *  []
   * 
   * 
   **/   

  const stopCamera = () => {
    closeCamera();
    //clearOverlay(cameraCanvas); //this is to clear the overlay

  /** 
   * server-side rendering for the playlist and to generate the playlist according to the emotion that caputure in the camera
   * backend send the emotion to the frontend and frontend will generate the playlist according to the emotion
   * the generate playlist will be display in the frontend
   * 
   * 
   * 
   * 
   **/ 
  }

  const findTheEmotion = (arr) => {
    // Initialize an empty object to store word frequencies
    const wordFrequency = {};
  
    // Loop through the array and count word frequencies
    arr.forEach((word) => {
      // Convert the word to lowercase to make the comparison case-insensitive
      const lowercaseWord = word.toLowerCase();
      
      if (wordFrequency[lowercaseWord]) {
        wordFrequency[lowercaseWord]++;
      } else {
        wordFrequency[lowercaseWord] = 1;
      }
    });
  
    let mostUsedWord = "";
    let maxFrequency = 0;
  
    // Find the word with the highest frequency
    for (const word in wordFrequency) {
      if (wordFrequency[word] > maxFrequency) {
        maxFrequency = wordFrequency[word];
        mostUsedWord = word;
      }
    }
    console.log("mostUsedWord ------>",mostUsedWord);
    return mostUsedWord;
  }





  const clearOverlay = (canvas) => {
    //STOP FUNCTION
    if (!canvas || !canvas.current) {
      console.error("Canvas object or canvas.current is invalid.");
      console.log("*************************************************",emotionRead);
      const tempEmotion = findTheEmotion(emotionRead)
      console.log("----------------------------------------------2222>",tempEmotion);
      setCurrentEmotion(tempEmotion);
      console.log("------------------------------------------------->",currentEmotion);
      handleEmotion(tempEmotion);
      return;
    }
  
    canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     stopCamera();
  //   }, 5000);
  // }, [emotionRead]);

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
    <div className="flex flex-col">
      <div className="camera">
        <p className="scroll_down text-base font-semibold text-black">
          {" "}
          Please use a Clear Enviroment
        </p>
        <div className="camera__wrapper">
          <Webcam
            className="rounded-xl"
            audio={false}
            ref={camera}
            width="100%"
            height="auto"
          />
          <canvas
            className={classnames(
              "webcam-overlay",
              photoMode && "webcam-overlay--hidden"
            )}
            ref={cameraCanvas}
          />
        </div>
      </div>

      <div className="mockup-code">
        {results.length <= 0 ? (
          <div className="text-lg">
            <pre className="text-warning">
              <span className="loading loading-spinner text-warning"></span>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code>Emotion Model Loading ...</code>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code> </code>
            </pre>
          </div>
        ) : (
          " "
        )}

        {results && results.length > 0 ? (
          <div className="text-lg text-black z-30">
            <pre data-prefix=">" className="text-warning">
              <code>
                Emotion :{" "}
                {results[0].expressions?.asSortedArray()[0].expression}
              </code>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code>Age Around :{Math.round(results[0].age)} </code>
            </pre>
            <pre data-prefix=">" className="text-warning">
              <code>Gender :{results[0].gender}</code>
            </pre>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Camera;

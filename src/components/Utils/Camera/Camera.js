import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";

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
    if (!canvas || !canvas.current) {
      console.error("Canvas object or canvas.current is invalid.");
      return;
    }
  
    canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height);
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

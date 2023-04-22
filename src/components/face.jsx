import React from 'react'
import Header from './Header'
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const face = () => {

  // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/7L5G0wqRF/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-primary'> 
    <Header/>
    <div className='flex flex-row w-full h-full p-5 gap-4 bg-primary items-center justify-center '>
      <div className='bg-white basis-1/2 '>
      <button type="button" className='bg-blue-600 rounded-lg px-4 py-2 text-white text-lg m-2' 
      onclick={init()}>Start</button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>

      </div>
      {/* <div className='bg-white basis-1/2 '>

      </div> */}

    </div>

    
    </div>
  )
}

export default face


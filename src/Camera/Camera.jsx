import React, { useRef, useState } from 'react';
import './Camera.css'

function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesContainerRef = useRef(null);
    const [ ShowCameraButtons, setShowCameraButtons] = useState ( false)

    // const OpenCamera = async () =>{
    //     setShowCameraButtons(true);

    // }
    const toggleCameraButtons = () => {
        setShowCameraButtons(prevState => !prevState);
    };

    const FrontCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: "user"} });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };
    const BackCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: "environment"} });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleSnap = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current frame from the video onto the canvas
        context.save();
        context.scale(-1, 1); // Flip the image horizontally
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();

        // Create a data URL from the canvas image
        const image = canvas.toDataURL('image/png');

        // // Create a link element
        // const link = document.createElement('a');
        // link.href = image;
        // link.download = 'snapshot.png';

        // Programmatically click the link to trigger the download
        // link.click();
        const img = document.createElement('img');
        img.src = image;
        img.style.width = '40%'; // Adjust as needed
        img.style.margin = '10px'; // Add some margin for spacing

        // Append the img element to the getimage div
        imagesContainerRef.current.appendChild(img);
    };


    return (
        <div style={{width: '100%'}} className="mycontainer">
            <button onClick={toggleCameraButtons} style={{marginBottom: '30px'}} >Camera </button>
            { ShowCameraButtons && (
                <>
               <button id='front'  onClick={FrontCamera}>Front Camera</button>
               <button id='back' onClick={BackCamera} >Back Cmaera</button> 
               <button style={{ position: 'absolute', top: '6rem', zIndex: '2'}} onClick={handleSnap}>Snap Picture</button>

                </>
                
            ) }

            <div style={{height: '70%'}} className='vidDiv'>

                <video id='thecamera' ref={videoRef} autoPlay playsInline style={{ width: '100%', transform: 'scaleX(-1)', borderRadius: '10px', position: 'relative' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            <div className="getimage flex" ref={imagesContainerRef}>
     
            </div>
        </div>


    );
}

export default Camera;

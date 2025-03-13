//Cancas to contain all 3D elements of the scene
import React from 'react';                              //Import React
import { Canvas } from '@react-three/fiber';            //Import Canvas from react-three-fiber

function mainCanvas({ children }) {
    return (
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }} // Set the camera position
        style={{ height: '100vh' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        {children}
      </Canvas>
    );
}

export default mainCanvas;
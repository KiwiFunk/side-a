//Cancas to contain all 3D elements of the scene
import React from 'react';                              //Import React
import { Canvas } from '@react-three/fiber';            //Import Canvas from react-three-fiber
import Model from './components/Model'                  //Import Model component

function mainCanvas() {
    return (
        <Canvas style={{ height: '100vh' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <Model />
        </Canvas>
    );
}

export default mainCanvas;
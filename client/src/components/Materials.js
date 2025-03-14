//Material Creation for 3D models
import * as THREE from "three";

export const createAcrylicMaterial = () => {
    return new THREE.MeshToonMaterial({
        color: new THREE.Color('#ffffff'), // Slight blue tint
        transparent: true, // Allow transparency
        opacity: 0.5, // Cartoon-like transparency
        side: THREE.DoubleSide, // Render both sides
        flatShading: true, // Flat shading for the cartoon effect
    });
};

//Create materials for Tape and Labels
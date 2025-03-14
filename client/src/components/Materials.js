//Material Creation for 3D models
import * as THREE from "three";

export const createAcrylicMaterial = () => {
    return new THREE.MeshToonMaterial({
        color: new THREE.Color('#ffffff'),  // Base color of the material
        transparent: true,                  // Allow transparency
        opacity: 0.4,                       // Lower is more transparent
        side: THREE.DoubleSide,             // Render both sides
        flatShading: true,                  // Flat shading for the cartoon effect
    });
};

//Create materials for Tape and Labels
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function Outline({ children, color = "#000000", scale = 1.03 }) {
    const groupRef = useRef();

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.traverse((child) => {
                if (child.isMesh && !child.userData.isOutlineMesh) {
                    const outlineMesh = child.clone();

                    // Create outline material
                    outlineMesh.material = new THREE.MeshBasicMaterial({
                        color,
                        side: THREE.BackSide,       // Render back faces for the outline
                        depthWrite: true,           // Ensure depth is written to include inner geometry
                        transparent: true,          // Allow blending if needed
                        opacity: 1.0,               // Solid black outline (adjust as needed)
                    });

                    // Scale up the outline slightly
                    outlineMesh.scale.multiplyScalar(scale);

                    // Render the outline after the main mesh
                    outlineMesh.renderOrder = 1;
                    child.renderOrder = 0;

                    // Mark the outline mesh to prevent recursion
                    outlineMesh.userData.isOutlineMesh = true;

                    // Add the outline as a child of the original mesh
                    child.add(outlineMesh);
                }
            });
        }
    }, [color, scale]);

    return <group ref={groupRef}>{children}</group>;
}

export default Outline;

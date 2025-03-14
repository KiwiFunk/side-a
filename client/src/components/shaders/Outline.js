import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function Outline({ children, color = "#000000", scale = 1.0001 }) {
    const groupRef = useRef();

    useEffect(() => {
        if (groupRef.current) {
            // Traverse through the group and handle only original meshes
            groupRef.current.traverse((child) => {
                if (child.isMesh && !child.userData.isOutlineMesh) {
                    const outlineMesh = child.clone(); // Clone the original mesh

                    // Mark the outline mesh to avoid recursive traversal
                    outlineMesh.userData.isOutlineMesh = true;

                    // Apply the outline material
                    outlineMesh.material = new THREE.MeshBasicMaterial({
                        color,
                        side: THREE.BackSide, // Render back faces for the outline
                    });

                    // Slightly scale up the outline mesh
                    outlineMesh.scale.multiplyScalar(scale);

                    // Add the outline as a child of the original mesh
                    child.add(outlineMesh);
                }
            });
        }
    }, [color, scale]);

    return <group ref={groupRef}>{children}</group>;
}

export default Outline;

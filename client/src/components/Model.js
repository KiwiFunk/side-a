import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/*
BLENDER COORDS VS THREE.JS COORDS
BLENDER: 
X AXIS: LEFT TO RIGHT
Y AXIS: FORWARD TO BACKWARD
Z AXIS: UP AND DOWN

THREE.JS:
X AXIS: LEFT TO RIGHT
Y AXIS: UP AND DOWN
Z AXIS: FORWARD TO BACKWARD
*/

function Model() {
    const { nodes, materials } = useGLTF('/models/CassetteTape.gltf');
    const [scrollY, setScrollY] = useState(0);

    // Debug logs for loaded nodes and materials
    console.log('Loaded nodes:', nodes);
    console.log('Loaded materials:', materials);

    // Debugging Materials
    const debugMaterials = {
        case: new THREE.MeshStandardMaterial({ color: 'red' }),
        labels: new THREE.MeshStandardMaterial({ color: 'blue' }),
        tape: new THREE.MeshStandardMaterial({ color: 'green' })
    };


    useEffect(() => {
        // Enhanced Debug logging for materials and nodes
        console.log('Available Nodes:', Object.keys(nodes));
        console.log('Node Details:', nodes);
        console.log('Available Materials:', Object.keys(materials));
        console.log('Material Details:', materials);

        // Update scroll position
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);

    }, [nodes, materials]);  //Set dependencies for useEffect

    // Create references for the parts of the model we want to animate.
    const caseLowerRef = useRef();
    const caseLidRef = useRef();
    const cassetteRef = useRef();

    //Animation constraints
    const SCROLL_SENSITIVITY = 0.015;            // Decrease this number to make animations slower
    const MAX_ROTATION = Math.PI * 2;           // Maximum rotation (360 degrees)
    const MAX_SCALE = 1.5;                      // Maximum scale factor
    const MAX_LID_ANGLE = Math.PI / 3;          // Maximum lid opening angle (60 degrees)
    const TAPE_START_THRESHOLD = 0.7;           // Start tape movement at 70% of lid opening

    useFrame(() => {
        // Normalize scroll for animations (adjust as needed)
        const scrollFactor = (scrollY / 10) * SCROLL_SENSITIVITY;

        // ANIMATIONS
        // Use .current to check if the object has been loaded before accessing its properties

        // 1. Rotate & scale Case Lower
        if (caseLowerRef.current) {
            caseLowerRef.current.rotation.y = Math.min(scrollFactor * MAX_ROTATION, MAX_ROTATION);      // Rotate to 3Q angle
            const scale = Math.min(1 + scrollFactor, MAX_SCALE);
            caseLowerRef.current.scale.set(scale, scale, scale);                                        // Scale up
        }

        // 2. Rotate Case Lid with delay
    if (caseLidRef.current) {
        const lidOpenAmount = Math.min(scrollFactor * 2, MAX_LID_ANGLE);
        caseLidRef.current.rotation.x = lidOpenAmount;

        // 3. Move cassette with smoother transition
        if (cassetteRef.current) {
            const lidProgress = lidOpenAmount / MAX_LID_ANGLE;
            const lidThreshold = TAPE_START_THRESHOLD;
            
            if (lidProgress > lidThreshold) {
                // Normalize progress and apply smooth easing
                const normalizedProgress = (lidProgress - lidThreshold) / (1 - lidThreshold);
                const easedProgress = THREE.MathUtils.smoothstep(normalizedProgress, 0, 1);
                const targetLift = -0.044;
                
                cassetteRef.current.position.z = THREE.MathUtils.lerp(
                    0,
                    targetLift,
                    easedProgress
                );
            } else {
                cassetteRef.current.position.z = 0;
            }
        }
    }
    });

    // Three.js uses Y-up coordinate system, with the positive Z axis pointing towards the viewer. Case lid offset in blender is -2.5cm. 
    return (
        <group scale={[30, 30, 30]}>                                            //Set initial scale for the model
        <group ref={caseLowerRef} name="CaseLower">
            <mesh
                geometry={nodes['CaseLower'].geometry}
                material={debugMaterials.case}
            />

            {/* We have multiple materials applied to different parts of the same mesh, so need to load each part in */}

            <group
                ref={caseLidRef}
                name="CaseLid"
                position={[0, 0, 0.025]}
                rotation={[0, 0, 0]}
            >
                {/* Render all parts of the lid */}
                <mesh
                    geometry={nodes['CaseLid'].geometry}
                    material={debugMaterials.case}
                />
                <mesh
                    geometry={nodes['CaseLid_1'].geometry}
                    material={debugMaterials.case}
                />
                <mesh
                    geometry={nodes['CaseLid_2'].geometry}
                    material={debugMaterials.labels}
                />

                {/* Group for cassette meshes with shared ref */}
                <group 
                    ref={cassetteRef}
                    position={[0, 0, 0]}
                >
                    {/* Render all parts of the cassette */}
                    <mesh
                        geometry={nodes['CassetteTape'].geometry}
                        material={debugMaterials.tape}
                    />
                    <mesh
                        geometry={nodes['CassetteTape_1'].geometry}
                        material={debugMaterials.tape}
                    />
                    <mesh
                        geometry={nodes['CassetteTape_2'].geometry}
                        material={debugMaterials.labels}
                    />
                </group>
            </group>
        </group>
    </group>
    );
}

useGLTF.preload('/models/CassetteTape.gltf');           // Preload model

export default Model;

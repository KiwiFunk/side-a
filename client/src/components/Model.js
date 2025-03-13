import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
    const { nodes, materials } = useGLTF('/models/CassetteTape.gltf');
    const [scrollY, setScrollY] = useState(0);

    // Debug logs for loaded nodes and materials
    console.log('Loaded nodes:', nodes);
    console.log('Loaded materials:', materials);

    // Debugging Materials
    const debugMaterials = {
        caseLower: new THREE.MeshStandardMaterial({ color: 'red' }),
        caseLid: new THREE.MeshStandardMaterial({ color: 'blue' }),
        cassette: new THREE.MeshStandardMaterial({ color: 'green' })
    };


    useEffect(() => {
        // Update scroll position
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Create references for the parts of the model we want to animate.
    const caseLowerRef = useRef();
    const caseLidRef = useRef();
    const cassetteRef = useRef();

    useFrame(() => {
        // Normalize scroll for animations (adjust as needed)
        const scrollFactor = scrollY * 0.001;

        // ANIMATIONS
        // Use .current to check if the object has been loaded before accessing its properties

        // 1. Rotate & scale Case Lower
        if (caseLowerRef.current) {
            caseLowerRef.current.rotation.y = scrollFactor * Math.PI * 0.5;                         // Rotate to 3Q angle
            caseLowerRef.current.scale.set(1 + scrollFactor, 1 + scrollFactor, 1 + scrollFactor);   // Scale up
        }

        // 2. Rotate Case Upper (child of Case Lower)
        if (caseLidRef.current) {
            caseLidRef.current.rotation.x = Math.min(scrollFactor * 2.5, 70 * (Math.PI / 180));     // Open lid
        }

        // 3. Slide Cassette Tape (child of Case Upper)
        if (cassetteRef.current) {
            cassetteRef.current.position.y = scrollFactor * 5;                                      // Move up along local Y-axis
        }

    });

    return (
        <group scale={[60, 60, 60]}>
            {/* Base case */}
            <group ref={caseLowerRef} name="CaseLower">
                <mesh
                    geometry={nodes['CaseLower'].geometry}
                    material={debugMaterials.caseLower}             // Change to materials['Case'] for original material   
                />

                {/* Lid group - position it relative to the base */}
                <group
                    ref={caseLidRef}
                    name="CaseLid"
                    position={[0, 0.015, 0.13]}                     // Adjust these values to match the model
                    rotation={[0, 0, 0]}
                >
                    <mesh
                        geometry={nodes['CaseLid'].geometry}
                        material={debugMaterials.caseLid}           // Change to materials['Case'] for original material
                    />

                    {/* Cassette - position it relative to the lid */}
                    <mesh
                        ref={cassetteRef}
                        geometry={nodes['CassetteTape'].geometry}
                        material={debugMaterials.cassette}          // Change to materials['Cassette'] for original material
                        position={[0, 0.01, 0]}                     // Adjust these values to match the model
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/CassetteTape.gltf');           // Preload model

export default Model;

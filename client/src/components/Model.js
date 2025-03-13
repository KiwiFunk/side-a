import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
    const { nodes, materials } = useGLTF('/models/CassetteTape.gltf');
    const [scrollY, setScrollY] = useState(0);

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
            <group ref={caseLowerRef} name="CaseLower">
                <mesh geometry={nodes['CaseLower'].geometry} material={materials['Case']} />
                <group ref={caseLidRef} name="CaseLid">
                    <mesh geometry={nodes['CaseLid'].geometry} material={materials['Case']} />
                    <mesh 
                        ref={cassetteRef}
                        geometry={nodes['CassetteTape'].geometry} 
                        material={materials['Cassette']} 
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/CassetteTape.gltf');           // Preload model

export default Model;

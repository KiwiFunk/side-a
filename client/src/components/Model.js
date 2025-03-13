import React, { useEffect, useState } from 'react';
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

    useFrame(() => {
        // Normalize scroll for animations (adjust as needed)
        const scrollFactor = scrollY * 0.001;

        // Animations
        // 1. Rotate & scale Case Lower
        const caseLower = nodes['CaseLower'];
        caseLower.rotation.y = scrollFactor * Math.PI * 0.5; // Rotate to 3Q angle
        caseLower.scale.set(1 + scrollFactor, 1 + scrollFactor, 1 + scrollFactor); // Scale up

        // 2. Rotate Case Upper (child of Case Lower)
        const caseUpper = nodes['CaseLid'];
        caseUpper.rotation.x = Math.min(scrollFactor * 2.5, 70 * (Math.PI / 180)); // Open lid

        // 3. Slide Cassette Tape (child of Case Upper)
        const cassetteTape = nodes['CassetteTape'];
        cassetteTape.position.y = scrollFactor * 5; // Move up along local Y-axis
    });

    return (
        <group>
            <group name="CaseLower">
                <mesh geometry={nodes['CaseLower'].geometry} material={materials['Case']} />
                <group name="CaseLid">
                    <mesh geometry={nodes['CaseLid'].geometry} material={materials['Case']} />
                    <mesh geometry={nodes['CassetteTape'].geometry} material={materials['Cassette']} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/CassetteTape.gltf');           // Preload model

export default Model;

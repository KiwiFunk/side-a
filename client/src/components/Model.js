//Handle the 3D model rendering
import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
  const { nodes, materials } = useGLTF('/public/models/CassetteTape.gltf');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    const scaleFactor = 1 + scrollY * 0.001;        // Adjust scaling rate
    const rotationFactor = scrollY * 0.002;         // Adjust rotation rate

    // Update model transformations based on scroll
    nodes.case_lid.scale.set(scaleFactor, scaleFactor, scaleFactor);
    nodes.case_lid.rotation.x = rotationFactor;

    nodes.cassette_tape.scale.set(scaleFactor, scaleFactor, scaleFactor);
    nodes.cassette_tape.rotation.y = rotationFactor;
  });

  return (
    <group>
      <mesh geometry={nodes.case_bottom.geometry} material={materials.case_bottom} />
      <mesh geometry={nodes.case_lid.geometry} material={materials.case_lid} />
      <mesh geometry={nodes.cassette_tape.geometry} material={materials.cassette_tape} />
    </group>
  );
}

export default Model;

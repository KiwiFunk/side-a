import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
BLENDER: X: LEFT TO RIGHT, Y: FORWARD TO BACKWARD, Z: UP AND DOWN

THREE.JS: X: LEFT TO RIGHT, Y: UP AND DOWN, Z: FORWARD TO BACKWARD
*/

gsap.registerPlugin(ScrollTrigger);

function Model() {
    const { nodes } = useGLTF("/models/CassetteTape.gltf");
    
    //Create references for the parts of the model we want to animate
    const caseLowerRef = useRef();
    const caseLidRef = useRef();
    const cassetteRef = useRef();

    // Debugging Materials
    const debugMaterials = {
        case: new THREE.MeshStandardMaterial({ color: "red" }),
        labels: new THREE.MeshStandardMaterial({ color: "blue" }),
        tape: new THREE.MeshStandardMaterial({ color: "green" }),
    };

    // Model Materials
    const modelMaterials = {
        case: new THREE.MeshStandardMaterial({ color: "rgb(200, 200, 200)" }),
        labels: new THREE.MeshStandardMaterial({ color: "rgb(200, 200, 200)" }),
        tape: new THREE.MeshStandardMaterial({ color: "rgb(200, 200, 200)" }),
    };

    useEffect(() => {
        // GSAP ScrollTrigger animation logic
        ScrollTrigger.defaults({ markers: true });      // Enable debug markers

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,                 // Attach ScrollTrigger to the whole page
                start: "top top",                       // When the top of the page reaches the top of the viewport
                end: "bottom bottom",                   // When the bottom of the page reaches the bottom of the viewport
                scrub: true,                            // Makes the animation follow the scroll progress
            },
        });

        // Animate the caseLower: scale and rotate
        if (caseLowerRef.current) {
            timeline.to(caseLowerRef.current.rotation, { y: Math.PI * 2, ease: "power2.inOut" });             // Rotate 360 degrees
            timeline.to(caseLowerRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0);     // Scale up
        }

        // Animate the caseLid: rotate open
        if (caseLidRef.current) {
            timeline.to(caseLidRef.current.rotation, { x: Math.PI / 4, ease: "back.out(6)" }, "<");          // Open lid
        }

        // Animate the cassette: move it along the Z-axis
        if (cassetteRef.current) {
            timeline.to(cassetteRef.current.position, { z: -0.044, ease: "circ.out" }, "<");              // Lift cassette
        }

        // Cleanup ScrollTrigger on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <group scale={[30, 30, 30]}>                                     
            <group ref={caseLowerRef} name="CaseLower">
                <mesh geometry={nodes['CaseLower'].geometry} material={modelMaterials.case} />

                {/* We have multiple materials applied to different parts of the same mesh, so need to load each part in */}
                <group ref={caseLidRef} name="CaseLid" position={[0, 0, 0.025]} rotation={[0, 0, 0]}>

                    {/* Render all parts of the lid */}
                    <mesh geometry={nodes['CaseLid'].geometry} material={modelMaterials.case} />
                    <mesh geometry={nodes['CaseLid_1'].geometry} material={modelMaterials.case} />
                    <mesh geometry={nodes['CaseLid_2'].geometry} material={modelMaterials.labels} />

                    {/* Group for cassette meshes with shared ref */}
                    <group ref={cassetteRef} position={[0, 0, 0]}>
                        {/* Render all parts of the cassette */}
                        <mesh geometry={nodes['CassetteTape'].geometry} material={modelMaterials.tape} />
                        <mesh geometry={nodes['CassetteTape_1'].geometry} material={modelMaterials.tape} />
                        <mesh geometry={nodes['CassetteTape_2'].geometry} material={modelMaterials.labels} />
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/models/CassetteTape.gltf");
export default Model;
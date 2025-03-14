import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createAcrylicMaterial } from "./Materials";

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

    // Model Materials
    const modelMaterials = {
        case: createAcrylicMaterial(),
        labels: new THREE.MeshStandardMaterial({ color: "rgb(167, 167, 167)" }),
        tape: new THREE.MeshStandardMaterial({ color: "rgb(214, 214, 214)" }),
    };

    useEffect(() => {
        // Track base rotation from scroll driven animation
        let baseRotationY = 0;
        
        // GSAP ScrollTrigger animation logic
        ScrollTrigger.defaults({ markers: false });                  // Enable debug markers (set to false for production)

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#main-scene",                             // Attach ScrollTrigger to the parent container
                start: "top top",                                   // When the top of the page reaches the top of the viewport
                end: "+=1000",                                      // Scroll duration for animation
                scrub: true,                                        // Makes the animation follow the scroll progress
                pin: true,                                          // PINS the container in place
                anticipatePin: 1,
                onUpdate: (self) => {                               
                    baseRotationY = self.progress * Math.PI * 2;    //Updating base rotation from scroll progress
                },
            },
        });
        
        // Animate the caseLower: scale and rotate
        if (caseLowerRef.current) {
            timeline.to(caseLowerRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0);                             // Scale up
        }

        // Animate the caseLid: rotate open
        if (caseLidRef.current) {
            timeline.to(caseLidRef.current.rotation, { x: Math.PI / 4, ease: "back.out(6)" }, "<");             // Open lid
        }

        // Animate the cassette: move it along the Z-axis
        if (cassetteRef.current) {
            timeline.to(cassetteRef.current.position, { z: -0.044, ease: "circ.out", delay: 0.02 }, "<");       // Lift cassette (Use delay to make sure it doesnt start moving before the lid opens)
        }

        // Idle animation layered on top of scroll-based rotation
        gsap.ticker.add(() => {
            if (caseLowerRef.current) {
                // Combine the base rotation (from scroll) with the idle animation (oscillating rotation)
                const idleRotationY = Math.sin(Date.now() * 0.001) * 0.1; // Oscillation for idle
                caseLowerRef.current.rotation.y = baseRotationY + idleRotationY;
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());      // Cleanup ScrollTrigger on component unmount
            gsap.ticker.remove(() => {});                                   // Cleanup idle animation ticker
        };
    }, []);

    return (
        <group scale={[26, 26, 26]} rotation={[0.6, 6, 0.5]}>                                     
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
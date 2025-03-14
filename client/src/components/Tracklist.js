import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Tracklist() {
    const tracklistRef = useRef(); // Reference for the entire tracklist section
    const h2Ref = useRef(); // Reference for the h2 element
    const columnsRef = useRef([]); // Reference for the columns (Side A and Side B)

    // Add columns to the refs array
    const addToRefs = (el) => {
        if (el && !columnsRef.current.includes(el)) {
            columnsRef.current.push(el);
        }
    };

    useEffect(() => {
        const timeline = gsap.timeline();

        // Fade in the h2
        timeline.from(h2Ref.current, {
            opacity: 0,
            y: -20, // Move up slightly while fading in
            duration: 1,
            ease: "power2.out",
        });

        // Animate the columns with a pop and wiggle effect
        timeline.from(columnsRef.current, {
            opacity: 0,
            scale: 0.8, // Start smaller for a "pop" effect
            rotate: -5, // Slight rotation for playfulness
            duration: 1,
            stagger: 0.3, // Stagger animations between columns
            ease: "elastic.out(1, 0.5)", // Elastic easing for the wiggle effect
        }, "-=0.5"); // Start slightly before the h2 animation ends

    }, []);

    return (
        <section ref={tracklistRef} className='tracklist'>
            <h2 ref={h2Ref}>Username's Playlist:</h2>
            <div ref={addToRefs} className='tracklist-column'>
                <h3>Side <span className='side-circle'>A</span></h3>
                <ol>
                    <li><span className='track-name'>Next Semester</span><span className='artist-name'>Twenty One Pilots</span></li>
                    <li><span className='track-name'>Cheerleader</span><span className='artist-name'>Porter Robinson</span></li>
                    <li><span className='track-name'>Favourite</span><span className='artist-name'>Fontaines D.C.</span></li>
                    <li><span className='track-name'>Tomorrow Is Closed</span><span className='artist-name'>Nothing But Thieves</span></li>
                    <li><span className='track-name'>Stereo Play</span><span className='artist-name'>James Ivy</span></li>
                </ol>
            </div>
            <div ref={addToRefs} className='tracklist-column'>
                <h3>Side <span className='side-circle'>B</span></h3>
                <ol>
                    <li><span className='track-name'>Hardest To Love</span><span className='artist-name'>The Weekend</span></li>
                    <li><span className='track-name'>Heaven Is Calling</span><span className='artist-name'>Jai Wolf</span></li>
                    <li><span className='track-name'>Marigold</span><span className='artist-name'>Frost Children</span></li>
                    <li><span className='track-name'>Chinatown</span><span className='artist-name'>Bleachers ft. Bruce Springsteen</span></li>
                    <li><span className='track-name'>Unbound</span><span className='artist-name'>Shallou</span></li>
                </ol>
            </div>
        </section>
    );
}

export default Tracklist;

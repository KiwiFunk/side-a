//Display the tracklist for the current selected mixtape after the 3d animation has finished.
import React from 'react';

function Tracklist() {
    return (
        <section className='tracklist'>
            <h2>Username's Playlist:</h2>
            <div className='tracklist-column'>
                <h3>Side <span className='side-circle'>A</span></h3>
                <ol>
                    <li><span className='track-name'>Next Semester</span><span className='artist-name'>Twenty One Pilots</span></li>
                    <li><span className='track-name'>Cheerleader</span><span className='artist-name'>Porter Robinson</span></li>
                    <li><span className='track-name'>Favourite</span><span className='artist-name'>Fontaines D.C.</span></li>
                    <li><span className='track-name'>Tomorrow Is Closed</span><span className='artist-name'>Nothing But Thieves</span></li>
                    <li><span className='track-name'>Stereo Play</span><span className='artist-name'>James Ivy</span></li>
                </ol>
            </div>
            <div className='tracklist-column'>
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
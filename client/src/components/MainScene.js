import React from 'react';                              //Import React
import MainCanvas from './MainCanvas';                  //Import mainCanvas component
import Model from './Model';                            //Import Model component
import Outline from './shaders/Outline';                //Import Outline component

function MainScene() {
    return (
        <div id="main-scene" className="scene-container">
            <MainCanvas>
                {/* Adjust these values to make the outline more visible */}
                <Outline color="#000000" scale={1.015}>
                    <Model />
                </Outline>
            </MainCanvas>
        </div>
    );
}

export default MainScene;
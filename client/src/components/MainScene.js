import React from 'react';                              //Import React
import MainCanvas from './MainCanvas';                  //Import mainCanvas component
import Model from './Model';                            //Import Model component

function MainScene() {
    return (
        <div>
            <MainCanvas>
                <Model />
            </MainCanvas>
        </div>
    );
}

export default MainScene;
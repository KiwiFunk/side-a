import React from 'react';                              //Import React
import mainCanvas from './mainCanvas';                  //Import mainCanvas component
import Model from './Model';                            //Import Model component

function mainScene() {
    return (
        <div>
            <mainCanvas>
                <Model />
            </mainCanvas>
        </div>
    );
}

export default mainScene;
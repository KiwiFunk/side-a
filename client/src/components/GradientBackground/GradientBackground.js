import React, { useState } from "react";
import chroma from "chroma-js";
import "./GradientBackground.css";

const GradientBackground = () => {
    const [color1, setColor1] = useState("#F69746"); // Default color 1
    const [color2, setColor2] = useState("#FFDE97"); // Default color 2
    const gradientColors = chroma.scale([color1, color2]).colors(6); // Generate 6 intermediate colors

    return (
        <div 
            className="gradient-background"
            style={{
                background: `linear-gradient(120deg, ${gradientColors.join(", ")})`
            }}
        >
            {/* Incorporate controls to allow user to change greadient colors when creating a mixtape
            <div className="controls">
                <label>
                    Pick Color 1:
                    <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                    />
                </label>
                <label>
                    Pick Color 2:
                    <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                    />
                </label>
            </div>
            */}
        </div>
    );
};

export default GradientBackground;

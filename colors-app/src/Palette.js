import React, { useState } from 'react'
import { ColorBox } from './ColorBox';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Palette.css";

export const Palette = (props) => {
    const [level, setLevel] = useState(500);

    const colorBoxes = props.palette.colors[level].map(color => (
        <ColorBox background={ color.hex } name={ color.name }/>
    ) );
    return (
        <div className="Palette">
            {/* Navbar goes here */}
            <Slider 
                defaultValue={ level }
                min={ 100 }
                max={ 900 }
                onAfterChange={ setLevel }
                step={ 100 }
            />
            <div className="Palette-colors">
                {/* bunch of color boxes*/}
                { colorBoxes }
            </div>
            {/* footer eventually */}

        </div>
    )
}
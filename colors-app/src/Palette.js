import React, { useState } from 'react'
import { ColorBox } from './ColorBox';
import { Navbar } from "./Navbar";
import "./Palette.css";

export const Palette = (props) => {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex")

    const colorBoxes = props.palette.colors[level].map(color => (
        <ColorBox background={ color[format] } name={ color.name }/>
    ));

    return (
        <div className="Palette">
            {/* Navbar goes here */}
            <Navbar level={ level } setLevel={ setLevel } format={ format } setFormat={ setFormat }/>
            <div className="Palette-colors">
                {/* bunch of color boxes*/}
                { colorBoxes }
            </div>
            {/* footer eventually */}

        </div>
    )
}
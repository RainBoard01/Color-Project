import React, { useState } from 'react'
import { ColorBox } from './ColorBox';
import { Navbar } from "./Navbar";
import "./Palette.css";

export const Palette = (props) => {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");

    const { colors, paletteName, emoji, id } = props.palette;

    const colorBoxes = colors[level].map(color => (
        <ColorBox
            background={ color[format] }
            name={ color.name }
            key={ color.id }
            colorUrl={ `/palette/${id}/${color.id}` }
            showLink={ true }
        />
    ));

    return (
        <div className="Palette">
            <Navbar
                level={level}
                setLevel={setLevel}
                format={format}
                setFormat={setFormat}
            />
            <div className="Palette-colors">
                { colorBoxes }
            </div>
            <footer className="Palette-footer">
                { paletteName }
                <span className="emoji">
                    { emoji }
                </span>
            </footer>
        </div>
    )
}
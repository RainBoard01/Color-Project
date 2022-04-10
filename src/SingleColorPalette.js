import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorBox } from './ColorBox';
import { Navbar } from './Navbar';
import { PaletteFooter } from './PaletteFooter';

export const SingleColorPalette = props => { 
    const { palette, colorId } = props;
    const [format, setFormat] = useState("hex");

    const gatherShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }

        return shades.slice(1);
    };

    const shades = gatherShades(palette, colorId);

    const colorBoxes = shades.map(color => (
        <ColorBox
            background={ color[format] }
            name={ color.name }
            key={ color.name.replace(/ /g,"-") }
            showLink={ false }
        />
    ))

    return (
        <div className="Single-Color-Palette Palette">
            <Navbar
                showSlider={false}
                format={ format }
                setFormat={ setFormat }
            />
            <div className="Palette-colors">
                { colorBoxes }
                <div className="go-back ColorBox">
                    <Link to={ `/palette/${ palette.id }` } className="back-button">GO BACK</Link>
                </div>
            </div>
            <PaletteFooter paletteName={ palette.paletteName } emoji={ palette.emoji }/>
        </div>
    )
}

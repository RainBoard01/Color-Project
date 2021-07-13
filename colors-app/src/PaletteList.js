import React from 'react';
import "./PaletteList.css";
import { MiniPalette } from './MiniPalette';

export const PaletteList = props => {
    const { palettes } = props;
    return (
        <div className="paletteList">
            <div className="container">
                <nav className="nav">
                    <h1>React Colors</h1>
                </nav>
                <div className="palettes">
                    {palettes.map(palette => (
                        <MiniPalette { ...palette } />
                    ))}
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import "./PaletteList.css";
import { Card } from './Card';

export const PaletteList = props => {
    const { palettes } = props;

    const cards = palettes.map(palette => (
        <Card {...palette} key={ palette.id } />
    ));

    return (
        <div className="paletteList">
            <div className="container">
                <nav className="nav">
                    <h1>React Colors</h1>
                </nav>
                <div className="palettes">
                    { cards }
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import "./Card.css";

export const Card = props => {
    const { paletteName, emoji, colors } = props;

    const miniColorBoxes = colors.map(color => (
        <div
            className="miniColorBox"
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ));

    return (
        <div className="card">
            <div className="colors">
                { miniColorBoxes }         
            </div>
            <div className="title">{ paletteName }<span>{ emoji }</span></div>
        </div>
    )
}

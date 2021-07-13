import React from 'react';
import "./MiniPalette.css";

export const MiniPalette = props => {
    const { paletteName, emoji } = props;

    return (
        <div className="card">
            <div className="colors">
                
            </div>
            <div className="title">{ paletteName }<span>{ emoji }</span></div>
        </div>
    )
}

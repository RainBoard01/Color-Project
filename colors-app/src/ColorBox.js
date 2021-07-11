import React from 'react';
import "./ColorBox.css";

export const ColorBox = (props) => {
    return (
        <div style={{ background: props.background }} className="ColorBox">
            <span>{ props.name }</span>
            <span>MORE</span>
        </div>
    )
}

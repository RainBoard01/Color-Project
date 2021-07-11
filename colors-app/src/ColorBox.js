import React from 'react';
import "./ColorBox.css";

export const ColorBox = (props) => {
    const { name, background } = props;
    return (
        <div style={{ background }} className="ColorBox">
            <div className="copy-container">
                <div className="box-content">
                    <span>{ name }</span>
                </div>
                <button className="copy-button">Copy</button>
            </div>
            <span className="see-more">MORE</span>
        </div>
    )
}

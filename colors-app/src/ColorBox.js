import React from 'react';
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const ColorBox = (props) => {
    const { name, background } = props;
    return (
        <CopyToClipboard text={ background }>
            <div style={{ background }} className="ColorBox">
                <div className="copy-container">
                    <div className="box-content">
                        <span>{ name }</span>
                    </div>
                    <button className="copy-button">Copy</button>
                </div>
                <span className="see-more">MORE</span>
            </div>
        </CopyToClipboard>
    )
}
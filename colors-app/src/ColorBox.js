import React, { useState, useEffect } from 'react';
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const ColorBox = (props) => {
    const [ copied, setCopied ] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopied(false);
        },1300);

        return () => clearTimeout(timeout);
    },[copied]);

    const { name, background } = props;
    return (
        <CopyToClipboard text={ background } onCopy={ () => setCopied(true) }>
            <div style={{ background }} className="ColorBox">
                <div style={{ background }} className={`copy-overlay ${ copied && "show" }`}/>
                <div className={`copy-msg ${ copied && "show" }`}>
                    <h1>Copied!</h1>
                    <p>{ background }</p>
                </div>
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
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./ColorBox.css";
import chroma from 'chroma-js';
import { CopyToClipboard } from "react-copy-to-clipboard";

export const ColorBox = (props) => {
    const [ copied, setCopied ] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopied(false);
        },1300);

        return () => clearTimeout(timeout);
    },[copied]);

    const { name, background, colorUrl, showLink } = props;
    const isDarkColor = chroma(background).luminance() <= 0.1;
    const isLightColor = chroma(background).luminance() >= 0.5;

    return (
        <CopyToClipboard text={ background } onCopy={ () => setCopied(true) }>
            <div style={{ background }} className="ColorBox">
                <div style={{ background }} className={`copy-overlay ${ copied && "show" }`}/>
                <div className={`copy-msg ${ copied && "show" }`}>
                    <h1>Copied!</h1>
                    <p className={ isLightColor ? "black-font" : "" }>{ background }</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={ isDarkColor ? "white-font" : "" }>{ name }</span>
                    </div>
                    <button className={ `copy-button ${ isLightColor ? "black-font" : "" }` }>Copy</button>
                </div>
                { showLink && (
                    <Link to={colorUrl} onClick={e => e.stopPropagation()}>
                        <span className={ `see-more ${ isLightColor ? "black-font" : "" }` }>MORE</span>
                    </Link>
                )}
            </div>
        </CopyToClipboard>
    )
}
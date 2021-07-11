import React from 'react'
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import { MenuItem } from '@material-ui/core';
import "rc-slider/assets/index.css";
import "./Navbar.css";

export const Navbar = props => {
    const { level, setLevel, format, setFormat } = props

    return (
        <header className="navbar">
            <div className="logo">
                <a href="/">reactcolorpicker</a>
            </div>
            <div className="slider-container">
                <span>Level: { level }</span>
                <div className="slider">
                    <Slider 
                        defaultValue={ level }
                        min={ 100 }
                        max={ 900 }
                        onChange={ setLevel }
                        step={ 100 }
                    />
                </div>
            </div>
            <div className="select-container">
                <Select value={ format } onChange={ e => setFormat(e.target.value) }>
                    <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem> 
                </Select>
            </div>
        </header>
    )
}

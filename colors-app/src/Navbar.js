import React from 'react'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export const Navbar = props => {
    const { level, setLevel } = props

    return (
        <header className="navbar">
            <div className="logo">
                <a href="#">reactcolorpicker</a>
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
        </header>
    )
}

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Slider from "rc-slider";

import { IconButton, MenuItem, Select, Snackbar } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

import "rc-slider/assets/index.css";
import "./Navbar.css";

export const Navbar = props => {
    const { level, setLevel, format, setFormat, showSlider } = props;

    const [open, setOpen] = useState(false);

    const handleChange = event => {
        setFormat(event.target.value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <header className="navbar">
            <div className="logo">
                <Link to="/">reactcolorpicker</Link>
            </div>

            { showSlider && (
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
            ) }
            
            <div className="select-container">
                <Select value={ format } onChange={ handleChange  }>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem> 
                </Select>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={ `Format Changed to ${ format.toUpperCase() }` }
                    action={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            </div>
        </header>
    )
}

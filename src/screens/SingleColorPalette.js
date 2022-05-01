import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorBox } from '../components/ColorBox';
import { Navbar } from '../components/Navbar';
import { PaletteFooter } from '../components/PaletteFooter';
import { useGeneratePalette } from '../hooks/useGeneratePalette';

export const SingleColorPalette = props => {
	const { paletteId, colorId } = props;
	const [format, setFormat] = useState('hex');

	const generatedPalette = useGeneratePalette(paletteId);

	const gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorToFilterBy)
			);
		}

		return shades.slice(1);
	};

	const shades = gatherShades(generatedPalette, colorId);

	return (
		<div className='Single-Color-Palette Palette'>
			<Navbar showSlider={false} format={format} setFormat={setFormat} />
			<div className='Palette-colors'>
				{shades.map(color => (
					<ColorBox
						background={color[format]}
						name={color.name}
						key={color.name.replace(/ /g, '-')}
						showLink={false}
					/>
				))}
				<div className='go-back ColorBox'>
					<Link to={`/palette/${generatedPalette.id}`} className='back-button'>
						GO BACK
					</Link>
				</div>
			</div>
			<PaletteFooter
				paletteName={generatedPalette.paletteName}
				emoji={generatedPalette.emoji}
			/>
		</div>
	);
};

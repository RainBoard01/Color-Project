import React, { useState } from 'react';
import { ColorBox } from '../components/ColorBox';
import { Navbar } from '../components/Navbar';
import { PaletteFooter } from '../components/PaletteFooter';
import './Palette.css';
import { useGeneratePalette } from '../hooks/useGeneratePalette';

export const Palette = props => {
	const [level, setLevel] = useState(500);
	const [format, setFormat] = useState('hex');

	const { colors, paletteName, emoji, id } = useGeneratePalette(props.paletteId);

	return (
		<div className='Palette'>
			<Navbar
				level={level}
				setLevel={setLevel}
				format={format}
				setFormat={setFormat}
				showSlider={true}
			/>
			<div className='Palette-colors'>
				{colors[level].map(color => (
					<ColorBox
						background={color[format]}
						name={color.name}
						key={color.id}
						colorUrl={`/palette/${id}/${color.id}`}
						showLink={true}
					/>
				))}
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

import React, { useState } from 'react';
import { ColorBox } from './ColorBox';
import { Navbar } from './Navbar';
import { PaletteFooter } from './PaletteFooter';
import './Palette.css';
import { useQueryClient } from 'react-query';
import { useGeneratePalette } from './hooks/useGeneratePalette';

export const Palette = props => {
	const [level, setLevel] = useState(500);
	const [format, setFormat] = useState('hex');

	const queryClient = useQueryClient();
	const palettes = queryClient.getQueryData('palettes')
		? queryClient.getQueryData('palettes').data.allPalettes
		: [];

	const palette = palettes
		? palettes.filter(palette => palette.id === props.paletteId)[0]
		: {};

	const { colors, paletteName, emoji, id } = useGeneratePalette(palette);

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

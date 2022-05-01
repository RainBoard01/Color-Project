import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PaletteList.css';
import { Card } from '../components/Card';
import { useGetPalettes } from '../hooks/useGetPalettes';

export const PaletteList = props => {
	const palettesOnLocalStorage = JSON.parse(
		window.localStorage.getItem(`["palettes"]`)
	);
	const [palettes, setPalettes] = useState(palettesOnLocalStorage || []);
	useGetPalettes('palettes', {
		onSuccess: data => {
			window.localStorage.setItem(
				`["palettes"]`,
				JSON.stringify(data.data.allPalettes)
			);
			setPalettes(data.data.allPalettes);
		}
	});

	const goToPalette = id => props.history.push(`/palette/${id}`);

	return (
		<div className='paletteList'>
			<div className='container'>
				<nav className='nav'>
					<h1>React Colors</h1>
					<Link className='createPaletteLink' to='/palette/new'>
						Create Palette
					</Link>
				</nav>
				<div className='palettes'>
					{palettes.map(palette => (
						<Card
							handleClick={() => goToPalette(palette.id)}
							{...palette}
							key={palette.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

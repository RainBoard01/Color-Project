import React from 'react';
import { Link } from 'react-router-dom';
import './PaletteList.css';
import { Card } from './Card';
import { useGetPalettes } from './hooks/useGetPalettes';

export const PaletteList = props => {
	const { data, isLoading } = useGetPalettes('palettes');
	const palettes = !isLoading ? data.data.allPalettes : [];

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

import React from 'react';
import { Link } from 'react-router-dom';
import './PaletteList.css';
import { Card } from './Card';

export const PaletteList = props => {
	const { palettes, deletePaletteWithColors } = props;

	const cards = palettes.map(palette => (
		<Card
			handleClick={() => goToPalette(palette.id)}
			{...palette}
			key={palette.id}
			deletePaletteWithColors={event =>
				deletePaletteWithColors(event, palette._id, palette.colors.data)
			}
		/>
	));

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
				<div className='palettes'>{cards}</div>
			</div>
		</div>
	);
};

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Card.css';

export const Card = props => {
	const { paletteName, emoji, colors, handleClick, deletePaletteWithColors } =
		props;

	const miniColorBoxes = colors.data.map(color => (
		<div
			className='miniColorBox'
			style={{ backgroundColor: color.color }}
			key={color.name}
		/>
	));

	return (
		<div className='card' onClick={handleClick}>
			<div className='delete'>
				<DeleteIcon
					className='deleteIcon'
					style={{ transition: 'all 0.3s ease-in-out' }}
				/>
			</div>
			<div className='colors'>{miniColorBoxes}</div>
			<div className='title'>
				{paletteName}
				<span onClick={deletePaletteWithColors}>{emoji}</span>
			</div>
		</div>
	);
};

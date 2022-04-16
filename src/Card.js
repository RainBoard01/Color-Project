import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Card.css';

export const Card = props => {
	const { paletteName, emoji, colors, handleClick, deletePalette } = props;

	const miniColorBoxes = colors.map(color => (
		<div
			className='miniColorBox'
			style={{ backgroundColor: color.color }}
			key={color.name}
		/>
	));

	return (
		<div className='card' onClick={handleClick}>
			<DeleteIcon
				className='deleteIcon'
				style={{ transition: 'all 0.3s ease-in-out' }}
				onClick={deletePalette}
			/>
			<div className='colors'>{miniColorBoxes}</div>
			<div className='title'>
				{paletteName}
				<span>{emoji}</span>
			</div>
		</div>
	);
};

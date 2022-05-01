import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Card.css';
import { useDeletePalette } from '../hooks/useDeletePalette';
import { useGetColors } from '../hooks/useGetColors';

export const Card = props => {
	const { _id, id, paletteName, emoji, handleClick } = props;
	const colorsOnLocalStorage = JSON.parse(
		window.localStorage.getItem(`["colors",${id}]`)
	);

	const { mutate } = useDeletePalette();

	const [colors, setColors] = useState(colorsOnLocalStorage || []);
	useGetColors(['colors', id], id, {
		onSuccess: data => {
			window.localStorage.setItem(
				`["colors",${id}]`,
				JSON.stringify(data.data.allColors)
			);
			setColors(data.data.allColors);
		}
	});

	const handleDelete = e => {
		e.stopPropagation();
		mutate(_id);
	};

	return (
		<div className='card' onClick={handleClick}>
			<DeleteIcon
				className='deleteIcon'
				style={{ transition: 'all 0.3s ease-in-out' }}
				onClick={handleDelete}
			/>
			<div className='colors'>
				{colors.map(color => (
					<div
						className='miniColorBox'
						style={{ backgroundColor: color.color }}
						key={color.name}
					/>
				))}
			</div>
			<div className='title'>
				{paletteName}
				<span>{emoji}</span>
			</div>
		</div>
	);
};

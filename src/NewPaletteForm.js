import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Appbar } from './Appbar';
import { DrawerC } from './DrawerC';
import { NewPalette } from './NewPalette';

export const NewPaletteForm = props => {
	/*----------------------useState----------------------*/
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);
	const [currentColor, setCurrentColor] = useState('');
	const [colors, setColors] = useState(
		props.data[Math.floor(Math.random() * props.data.length)].colors.data
	);
	const [currentName, setCurrentName] = useState('');
	const [currentPaletteName, setCurrentPaletteName] = useState('');

	/*----------------------validation----------------------*/
	useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', value =>
			colors.every(({ name }) => name.toLowerCase() !== currentName.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', value =>
			colors.every(({ color }) => color !== currentColor)
		);
		ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
			props.data.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== currentPaletteName.toLowerCase()
			)
		);
		return function cleanup() {
			ValidatorForm.removeValidationRule('isColorNameUnique');
			ValidatorForm.removeValidationRule('isColorUnique');
			ValidatorForm.removeValidationRule('isPaletteNameUnique');
		};
	});

	/*----------------------handlers----------------------*/
	const handleDrawerOpen = () => setIsDrawerOpen(true);
	const handleDrawerClose = () => setIsDrawerOpen(false);
	const handleDialogOpen = () => setIsDialogOpen(true);
	const handleDialogClose = () => setIsDialogOpen(false);
	const handleEmojiOpen = () => setIsEmojiOpen(true);
	const handleEmojiClose = () => setIsEmojiOpen(false);
	const handleNameChange = e => setCurrentName(e.target.value);
	const handleDialogChange = e => setCurrentPaletteName(e.target.value);
	const updateColor = color => setCurrentColor(color.hex);
	const addColor = () => {
		setColors([
			...colors,
			{
				color: currentColor,
				name: currentName
			}
		]);
		setCurrentName('');
	};
	const deleteColor = name =>
		setColors(colors.filter(color => color.name !== name));
	const generateRandomColor = () => {
		const allColors = props.data.map(palette => palette.colors.data).flat();
		setColors([
			...colors,
			allColors[Math.floor(Math.random() * allColors.length)]
		]);
	};
	const submitPalette = emoji => {
		const newPalette = {
			paletteName: currentPaletteName,
			id: currentPaletteName.toLowerCase().replace(/ /g, '-'),
			emoji: emoji.native,
			colors: colors
		};
		handleEmojiClose();
		setCurrentPaletteName('');
		props.savePalette(newPalette);
		props.history.push('/');
	};
	const savePaletteName = () => {
		handleDialogClose();
		handleEmojiOpen();
	};

	/*----------------------misc----------------------*/
	const isPaletteFull = colors.length >= 20;

	/*----------------------component----------------------*/
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Appbar
				isDrawerOpen={isDrawerOpen}
				handleDrawerOpen={handleDrawerOpen}
				handleDialogOpen={handleDialogOpen}
			/>
			<DrawerC
				isDrawerOpen={isDrawerOpen}
				handleDrawerClose={handleDrawerClose}
				setColors={setColors}
				generateRandomColor={generateRandomColor}
				isPaletteFull={isPaletteFull}
				currentColor={currentColor}
				currentName={currentName}
				updateColor={updateColor}
				addColor={addColor}
				handleNameChange={handleNameChange}
			/>
			<NewPalette
				colors={colors}
				setColors={setColors}
				isDrawerOpen={isDrawerOpen}
				deleteColor={deleteColor}
				isDialogOpen={isDialogOpen}
				handleDialogClose={handleDialogClose}
				submitPalette={submitPalette}
				currentPaletteName={currentPaletteName}
				handleDialogChange={handleDialogChange}
				isEmojiOpen={isEmojiOpen}
				savePaletteName={savePaletteName}
				handleEmojiClose={handleEmojiClose}
			/>
		</Box>
	);
};

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Appbar } from '../components/Appbar';
import { DrawerC } from '../components/DrawerC';
import { NewPalette } from '../components/NewPalette';
import { useCreatePalette } from '../hooks/useCreatePalette';
import { useGetColors } from '../hooks/useGetColors';
import { useGetPalettes } from '../hooks/useGetPalettes';

const generateRandomArray = array => {
	if (array.length === 0) return [];
	const newArray = [];
	const arrayRndNumbers = [];
	for (let i = 0; i < 20; i++) {
		let rndNumber = Math.floor(Math.random() * array.length);
		if (arrayRndNumbers.includes(rndNumber)) {
			i -= 1;
			continue;
		}
		arrayRndNumbers.push(rndNumber);
		newArray.push(array[rndNumber]);
	}
	return newArray;
};

export const NewPaletteForm = props => {
	/*--------------getlocalstorage if exist----------------*/
	const allColorsOnLocalStorage = JSON.parse(
		window.localStorage.getItem(`["colors"]`)
	);
	const palettesOnLocalStorage = JSON.parse(
		window.localStorage.getItem(`["palettes"]`)
	);

	/*----------------------useState----------------------*/
	const [palettesName, setPalettesName] = useState(
		palettesOnLocalStorage.map(palette => palette.paletteName) || []
	);
	const [allColors, setAllColors] = useState(allColorsOnLocalStorage || []);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);
	const [currentColor, setCurrentColor] = useState('');

	const [colors, setColors] = useState(generateRandomArray(allColors));
	const [currentName, setCurrentName] = useState('');
	const [currentPaletteName, setCurrentPaletteName] = useState('');

	/*------------query and mutate hooks------------*/
	useGetColors('colors', null, {
		onSuccess: data => {
			window.localStorage.setItem(
				`["colors"]`,
				JSON.stringify(data.data.allColors)
			);
			setAllColors(data.data.allColors);
			if (allColorsOnLocalStorage === null)
				setColors(generateRandomArray(data.data.allColors));
		}
	});
	useGetPalettes('palettes', {
		onSuccess: data => {
			window.localStorage.setItem(
				`["palettes"]`,
				JSON.stringify(data.data.allPalettes)
			);
			setPalettesName(data.data.allPalettes.map(palette => palette.paletteName));
		}
	});
	const createPalette = useCreatePalette();

	/*----------------------validation----------------------*/
	useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', value => {
			let isUnique = (toCompare, array) =>
				array.every(({ name }) => name.toLowerCase() !== toCompare.toLowerCase());
			return isUnique(value, colors) && isUnique(value, allColors);
		});
		ValidatorForm.addValidationRule('isColorUnique', value =>
			colors.every(
				({ color }) => color.toLowerCase() !== currentColor.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
			palettesName.every(
				paletteName => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
		return function cleanup() {
			ValidatorForm.removeValidationRule('isColorNameUnique');
			ValidatorForm.removeValidationRule('isColorUnique');
			ValidatorForm.removeValidationRule('isPaletteNameUnique');
		};
	}, [colors, allColors, palettesName, currentColor]);

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
		setCurrentColor('');
	};
	const deleteColor = name =>
		setColors(colors.filter(color => color.name !== name));
	const generateRandomColor = () => {
		let colorsName = colors.map(color => color.name);
		let rndColor = {};
		do {
			rndColor = allColors[Math.floor(Math.random() * allColors.length)];
		} while (colorsName.includes(rndColor.name));
		setColors([...colors, rndColor]);
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
		createPalette.mutate(newPalette);
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

import chroma from 'chroma-js';
import { useState } from 'react';
import { useGetColors } from './useGetColors';
import { useGetPalette } from './useGetPalette';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generateScale = (hexColor, numberOfColors) => {
	return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
};

const getRange = hexColor => {
	const end = '#fff';
	return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
};

export const useGeneratePalette = paletteId => {
	const paletteOnLocalStorage = JSON.parse(
		window.localStorage.getItem(`["palette",${paletteId}]`)
	);
	const colorsOnLocalStorage = JSON.parse(
		window.localStorage.getItem(`["colors",${paletteId}]`)
	);

	const [palette, setPalette] = useState(paletteOnLocalStorage || {});
	useGetPalette(['palette', paletteId], paletteId, {
		onSuccess: data => {
			window.localStorage.setItem(
				`["palette",${paletteId}]`,
				JSON.stringify(data.data.findPaletteByID)
			);
			setPalette(data.data.findPaletteByID);
		}
	});

	const [colors, setColors] = useState(colorsOnLocalStorage || []);
	useGetColors(['colors', paletteId], paletteId, {
		onSuccess: data => {
			window.localStorage.setItem(
				`["colors",${paletteId}]`,
				JSON.stringify(data.data.allColors)
			);
			setColors(data.data.allColors);
		}
	});

	let newPalette = {
		paletteName: palette.paletteName,
		id: palette.id,
		emoji: palette.emoji,
		colors: {}
	};
	for (let level of levels) {
		newPalette.colors[level] = [];
	}

	for (let color of colors) {
		let scale = generateScale(color.color, 10).reverse();

		for (let i in scale) {
			newPalette.colors[levels[i]].push({
				name: `${color.name} ${levels[i]}`,
				id: color.name.toLowerCase().replace(/ /g, '-'),
				hex: scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
			});
		}
	}

	return newPalette;
};

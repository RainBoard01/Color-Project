import chroma from 'chroma-js';
import { useGetColors } from './useGetColors';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generateScale = (hexColor, numberOfColors) => {
	return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
};

const getRange = hexColor => {
	const end = '#fff';
	return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
};

export const useGeneratePalette = starterPalette => {
	const { data, isLoading } = useGetColors(
		['colors', starterPalette.id],
		starterPalette.id
	);
	const colors = !isLoading ? data.data.allColors : [];

	let newPalette = {
		paletteName: starterPalette.paletteName,
		id: starterPalette.id,
		emoji: starterPalette.emoji,
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

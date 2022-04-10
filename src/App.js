import { useState, useEffect } from 'react';
import { Palette } from './Palette';
import { PaletteList } from './PaletteList';
import { NewPaletteForm } from './NewPaletteForm';
import { SingleColorPalette } from './SingleColorPalette';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import { getPalettes, createPalette, deletePalette, deleteColors } from './api';

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
	const [data, setData] = useState(savedPalettes || []);

	const getData = async () => {
		const res = await getPalettes();
		window.localStorage.setItem('palettes', JSON.stringify(res));
		setData(res);
	};

	const savePalette = async newPalette => {
		await createPalette(newPalette);
		getData();
	};

	const deletePaletteWithColors = async (event, paletteId, colors) => {
		const colorsId = colors.map(color => color._id);
		event.stopPropagation();
		await deletePalette(paletteId);
		await deleteColors(colorsId);
		getData();
	};

	useEffect(() => getData(), []);

	function findPaletteById(id) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				return i;
			}
		}
	}

	return (
		<Switch>
			<Route
				exact
				path='/palette/new'
				render={routeProps => (
					<NewPaletteForm savePalette={savePalette} data={data} {...routeProps} />
				)}
			/>
			<Route
				exact
				path='/'
				render={routeProps => (
					<PaletteList
						palettes={data}
						deletePaletteWithColors={deletePaletteWithColors}
						{...routeProps}
					/>
				)}
			/>
			<Route
				exact
				path='/palette/:paletteId'
				render={routeProps => (
					<Palette
						palette={generatePalette(
							data[findPaletteById(routeProps.match.params.paletteId)]
						)}
					/>
				)}
			/>
			<Route
				exact
				path='/palette/:paletteId/:colorId'
				render={routeProps => (
					<SingleColorPalette
						palette={generatePalette(
							data[findPaletteById(routeProps.match.params.paletteId)]
						)}
						colorId={routeProps.match.params.colorId}
					>
						Single Page
					</SingleColorPalette>
				)}
			/>
		</Switch>
	);
}

export default App;

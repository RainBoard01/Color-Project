import { Palette } from './Palette';
import { PaletteList } from './PaletteList';
import { NewPaletteForm } from './NewPaletteForm';
import { SingleColorPalette } from './SingleColorPalette';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route
				exact
				path='/palette/new'
				render={routeProps => <NewPaletteForm {...routeProps} />}
			/>
			<Route
				exact
				path='/'
				render={routeProps => <PaletteList {...routeProps} />}
			/>
			<Route
				exact
				path='/palette/:paletteId'
				render={routeProps => (
					<Palette paletteId={routeProps.match.params.paletteId} />
				)}
			/>
			<Route
				exact
				path='/palette/:paletteId/:colorId'
				render={routeProps => (
					<SingleColorPalette colorId={routeProps.match.params.colorId}>
						Single Page
					</SingleColorPalette>
				)}
			/>
		</Switch>
	);
}

export default App;

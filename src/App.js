import { Palette } from './screens/Palette';
import { PaletteList } from './screens/PaletteList';
import { NewPaletteForm } from './screens/NewPaletteForm';
import { SingleColorPalette } from './screens/SingleColorPalette';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route
				exact
				path='/'
				render={routeProps => <PaletteList {...routeProps} />}
			/>
			<Route
				exact
				path='/palette/new'
				render={routeProps => <NewPaletteForm {...routeProps} />}
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
					<SingleColorPalette
						colorId={routeProps.match.params.colorId}
						paletteId={routeProps.match.params.paletteId}
					/>
				)}
			/>
		</Switch>
	);
}

export default App;

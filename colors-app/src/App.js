import { Palette } from "./Palette";
import { PaletteList } from "./PaletteList";
import { SingleColorPalette } from "./SingleColorPalette";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {

  // returns the index of a palette given a array of palettes
  const findPaletteById = id => {
    for (let i = 0; i < seedColors.length; i++) {
      if (seedColors[i].id === id) {
        return i;
      }
    }
  }

  return (
    <Switch>
      <Route exact path="/" render={routeProps => <PaletteList palettes={ seedColors } { ...routeProps }/> }/>
      <Route exact path="/palette/:paletteId" render={
        routeProps => <Palette palette={ generatePalette(seedColors[findPaletteById(routeProps.match.params.paletteId)]) } />
      } />
      <Route exact path="/palette/:paletteId/:colorId" render={routeProps => (
        <SingleColorPalette
          palette={ generatePalette(seedColors[findPaletteById(routeProps.match.params.paletteId)]) }
          colorId={ routeProps.match.params.colorId }
        >Single Page</SingleColorPalette>
      )} />
    </Switch>
  );
}

export default App;

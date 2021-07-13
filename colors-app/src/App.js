import { Palette } from "./Palette";
import { PaletteList } from "./PaletteList";
import { SingleColorPalette } from "./SingleColorPalette";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  const findPaletteById = id => {
    for (let i = 0; i < seedColors.length; i++) {
      if (seedColors[i].id === id) {
        return i;
      }
    }
  }

  return (
    <Switch>
      <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} { ...routeProps }/> }/>
      <Route exact path="/palette/:id" render={
        routeProps => <Palette palette={ generatePalette(seedColors[findPaletteById(routeProps.match.params.id)]) }/>
      } />
      <Route exact path="/palette/:paletteId/:colorId" render={ () => <SingleColorPalette>Single Page</SingleColorPalette> }/>
    </Switch>
  );
}

export default App;

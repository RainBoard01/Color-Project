import { Palette } from "./Palette";
import { PaletteList } from "./PaletteList";
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
      <Route exact path="/" render={ () => <PaletteList palettes={ seedColors }/> }/>
      <Route exact path="/palette/:id" render={
        routeProps => <Palette palette={ generatePalette(seedColors[findPaletteById(routeProps.match.params.id)]) }/>
      }/>
    </Switch>
  );
}

export default App;

import Gamelogger from "./components/Gamelogger";
import { GameContextProvider } from "./GameContextProvider";
function App() {
  return (
      <GameContextProvider>
        <Gamelogger/>
      </GameContextProvider>
  );
}

export default App;

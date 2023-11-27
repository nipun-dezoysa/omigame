import Gamelogger from "./components/Gamelogger";
import { GameContextProvider } from "./GameContextProvider";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Layout from "./Pages/Layout";
function App() {
  return (
    <GameContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main />} />
          <Route path="/game" element={<Gamelogger />} />
        </Route>
      </Routes>
    </GameContextProvider>
  );
}

export default App;

import Gamelogger from "./components/Gamelogger";
import { GameContextProvider } from "./GameContextProvider";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import About from "./Pages/About";
import Layout from "./Pages/Layout";
function App() {
  return (
    <GameContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main />} />
          <Route path="/game/:rid" element={<Gamelogger />} />
          <Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
    </GameContextProvider>
  );
}

export default App;

import io from "socket.io-client";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { v4 } from "uuid";
import Gamelogger from "./components/Gamelogger";
const socket = io.connect("http://localhost:3001");
function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [gameid, setGameid] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["gameid"]);
  const create = () => {
    socket.emit("create_room", {name});
  };
  const join = () => {
    socket.emit("join_room", { name, roomId: room });
  };
  useEffect(() => {
    // if (!cookies.gameid) {
    //   setCookie("gameid", v4());
    // } else {
    //   socket.emit("user", { gameid: cookies.gameid });
    // }
  }, []);
  useEffect(() => {
    socket.on("gameid", (data) => {
      // setGameid(data);
      console.log(data);
    });
  }, [socket]);
  return (
    <CookiesProvider>
      <Gamelogger/>
      
    </CookiesProvider>
  );
}

export default App;

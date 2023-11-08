
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [msg,setMsg] = useState("");  
  const create = () => {
    socket.emit("create_room", { name,roomId:room });
  };
  const join = () => {
    socket.emit("join_room", { name, roomId: room });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsg(data);
    });
  }, [socket]);
  return (
    <>
      <div className="flex flex-col w-96 p-5 gap-2">
        <input
          className="bg-gray-100"
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-gray-100"
          type="text"
          name="room"
          placeholder="Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          className="bg-green-600"
          type="button"
          value="Create Room"
          onClick={create}
        />
        <input onClick={join} className="bg-green-700" type="button" value="Join Room" />
        {msg}
        
      </div>
    </>
  );
}

export default App;

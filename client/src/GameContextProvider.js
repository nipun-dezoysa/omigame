import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
export const GameContext = createContext({});
export function GameContextProvider({ children }) {
  const [roomid, setRoomid] = useState(null);

  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [slot3, setSlot3] = useState(null);
  const [slot4, setSlot4] = useState(null);

  const [slotCards1, setSlotCards1] = useState(0);
  const [slotCards2, setSlotCards2] = useState(0);
  const [slotCards3, setSlotCards3] = useState(0);
  const [slotCards4, setSlotCards4] = useState(0);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [userSlot, setUserSlot] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [gameStatus, setGameStatus] = useState({ status: "outside" });
  const [myCards, setMyCards] = useState([]);
  const [thOwner, setThOwner] = useState(0);

  const create = (name) => {
    socket.emit("create_room", { name });
  };
  const join = (name, room) => {
    socket.emit("join_room", { name, room });
  };
  const slotClick = (status, slot) => {
    socket.emit("slot_push", { status, slot, roomid, name });
  };

  const gameStart = () => {
    socket.emit("game_start", { roomid });
  };

  const thurumpu = (a) => {
    socket.emit("thurumpu", a);
  };

  useEffect(() => {
    socket.on("room", (data) => {
      setRoomid(data);
    });
    socket.on("admin", (data) => {
      setAdmin(data);
    });
    socket.on("cards", (data) => {
      if (myCards.length > 0) {
        if (myCards[0] != data[0]) {
          setMyCards([...myCards, data]);
        }
      } else {
        setMyCards(data);
      }
    });
    socket.on("slot_cards", (data) => {
      switch (data.slot) {
        case 1:
          data.status == 1
            ? setSlotCards1(slotCards1 + data.count)
            : setSlotCards1(slotCards1 - data.count);
          break;
        case 2:
          data.status == 1
            ? setSlotCards2(slotCards2 + data.count)
            : setSlotCards2(slotCards2 - data.count);
          break;
        case 3:
          data.status == 1
            ? setSlotCards3(slotCards3 + data.count)
            : setSlotCards3(slotCards3 - data.count);
          break;
        case 4:
          data.status == 1
            ? setSlotCards4(slotCards4 + data.count)
            : setSlotCards4(slotCards4 - data.count);
          break;
      }
    });
    socket.on("game_status", (data) => {
      setGameStatus(data);
      if (data.status == "thowner") setThOwner(data.slot);
      //round start weddi okkoma var tika reset karanna oni
    });
    socket.on("slot_pull", ({ status, slot, name }) => {
      switch (slot) {
        case 1:
          status == 1 ? setSlot1({ name, player: "other" }) : setSlot1(null);
          break;
        case 2:
          status == 1 ? setSlot2({ name, player: "other" }) : setSlot2(null);
          break;
        case 3:
          status == 1 ? setSlot3({ name, player: "other" }) : setSlot3(null);
          break;
        case 4:
          status == 1 ? setSlot4({ name, player: "other" }) : setSlot4(null);
          break;
      }
    });
    socket.on("slots", (data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].socket == socket.id) setUserSlot(data[i].playerno);
        switch (data[i].playerno) {
          case 1:
            data[i].socket == socket.id
              ? setSlot1({ name: data[i].name, player: "me" })
              : setSlot1({ name: data[i].name, player: "other" });
            break;
          case 2:
            data[i].socket == socket.id
              ? setSlot2({ name: data[i].name, player: "me" })
              : setSlot2({ name: data[i].name, player: "other" });
            break;
          case 3:
            data[i].socket == socket.id
              ? setSlot3({ name: data[i].name, player: "me" })
              : setSlot3({ name: data[i].name, player: "other" });
            break;
          case 4:
            data[i].socket == socket.id
              ? setSlot4({ name: data[i].name, player: "me" })
              : setSlot4({ name: data[i].name, player: "other" });
            break;
        }
      }
    });
    socket.on("error", (data) => {});
  }, [socket]);

  return (
    <GameContext.Provider
      value={{
        name,
        setName,
        id,
        setId,
        create,
        join,
        roomid,
        setRoomid,
        slot1,
        slot2,
        slot3,
        slot4,
        setSlot1,
        setSlot2,
        setSlot3,
        setSlot4,
        userSlot,
        setUserSlot,
        slotClick,
        admin,
        gameStart,
        myCards,
        gameStatus,
        slotCards1,
        slotCards2,
        slotCards3,
        slotCards4,
        thurumpu
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

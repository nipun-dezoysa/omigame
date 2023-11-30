import React, { createContext, useState, useEffect, useRef } from "react";
import { BiLogIn } from "react-icons/bi";
import io from "socket.io-client";
const socket = io.connect("https://omigame.onrender.com");
export const GameContext = createContext({});
export function GameContextProvider({ children }) {
  const [usercount, setUsercount] = useState(0);
  const [roomid, setRoomid] = useState(null);
  const [gameStatus, setGameStatus] = useState({ status: "outside" });

  const [roundid, setRoundid] = useState("");

  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [slot3, setSlot3] = useState(null);
  const [slot4, setSlot4] = useState(null);

  const [slotCards, setSlotCards] = useState(0);
  const slotCardsRef = React.useRef(slotCards);
  const setSlotCardsRef = (data) => {
    slotCardsRef.current = data;
    setSlotCards(data);
  };

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [userSlot, setUserSlot] = useState(0);
  const userslotRef = useRef(userSlot);
  const setUserslotRef = (data) => {
    userslotRef.current = data;
    setUserSlot(data);
  };

  const [admin, setAdmin] = useState(false);
  const [myCards, setMyCards] = useState([]);
  const mycardRef = React.useRef(myCards);
  const setcardRef = (data) => {
    mycardRef.current = data;
    setMyCards(data);
  };
  const [okbutt, setOkbutt] = useState(false);
const resetvalues = ()=>{
  setSlot1(null);
  setSlot2(null);
  setSlot3(null);
  setSlot4(null);
  setUserslotRef(0);
  setGameStatus({ status: "outside" });
}
  const slotClick = (status, slot) => {
    socket.emit("slot_push", { status, slot, roomid, name });
    setUserslotRef(slot);
  };

  const gameStart = () => {
    socket.emit("game_start", { roomid });
  };

  useEffect(() => {
    socket.on("usercount", (data) => {
      setUsercount(data);
    });
    socket.on("room", (data) => {
      setRoomid(data);
    });
    socket.on("admin", (data) => {
      setAdmin(data);
    });
    socket.on("cards", (data) => {
      setcardRef([...mycardRef.current, ...data]);
    });

    socket.on("game_status", (data) => {
      setGameStatus(data);
      if (data.status == "roundstart") {
        setRoundid(data.roundid);
        setcardRef([]);
      }
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
        setGameStatus,
        slotCards,
        setMyCards,
        okbutt,
        setOkbutt,
        socket,
        roundid,
        mycardRef,
        setcardRef,
        resetvalues,
        usercount,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

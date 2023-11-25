import { useState, useEffect, useContext } from "react";
import { GameContext } from "../GameContextProvider";
export default function Preimg({ src }) {
  const { slot1, slot2, slot3, slot4} = useContext(GameContext);
  const[name,setName]=useState("name");
  useEffect(()=>{
    switch (src.slot) {
      case 1:
        slot1 ? setName(slot1.name) : setName("player 1");
        break;
      case 2:
        slot2 ? setName(slot2.name) : setName("player 2");
        break;
      case 3:
        slot3 ? setName(slot3.name) : setName("player 3");
        break;
      case 4:
        slot4 ? setName(slot4.name) : setName("player 4");
        break;
    }
  },[]);
  return (
    <div className="w-[100px] flex flex-col items-center">
        <h1>{name}</h1>
      <img
        className="w-full"
        src={require(`./../cards/${src.img}`)}
        alt=""
      />
    </div>
  );
}

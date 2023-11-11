import { useState, useEffect, useContext } from "react";
import { GameContext } from "../GameContextProvider";
export default function OtherCardHolder({ no, styles }) {
  const [name, setName] = useState("Player");
  const [cardsCount, setCardsCount] = useState([]);
  const {
    userSlot,
    slot1,
    slot2,
    slot3,
    slot4,
    slotCards1,
    slotCards2,
    slotCards3,
    slotCards4,
  } = useContext(GameContext);
  useEffect(() => {
    switch (no) {
      case 1:
        slot1 ? setName(slot1.name) : setName("Disconnected");
        break;
      case 2:
        slot2 ? setName(slot2.name) : setName("Disconnected");
        break;
      case 3:
        slot3 ? setName(slot3.name) : setName("Disconnected");
        break;
      case 4:
        slot4 ? setName(slot4.name) : setName("Disconnected");
        break;
    }
  }, [slot1, slot2, slot3, slot4]);
  useEffect(() => {
    var a = 0;
    switch (no) {
      case 1:
        a = slotCards1;
        break;
      case 2:
        a = slotCards2;
        break;
      case 3:
        a = slotCards3;
        break;
      case 4:
        a = slotCards4;
        break;
    }
    var b=[];
    for(var i=0;i<a;i++)b.push("a");
    setCardsCount(b);
  }, [slotCards1, slotCards2, slotCards3, slotCards4]);
  return (
    <div className={styles + " bg-blue-700"}>
      {name}
      {cardsCount.map((card)=><div>yo</div>)}
    </div>
  );
}

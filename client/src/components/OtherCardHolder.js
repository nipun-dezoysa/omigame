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
    slotCards
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
    console.log(no," ",slotCards[no - 1]);
    var a = slotCards[no - 1];
    var b = [];
    for (var i = 0; i < a; i++) b.push("a");
    setCardsCount(b);
  }, [slotCards[0], slotCards[1], slotCards[2], slotCards[3]]);
  return (
    <div className={styles + " bg-blue-700"}>
      {name}
      {[...cardsCount].map((card)=><div>yo</div>)}
    </div>
  );
}

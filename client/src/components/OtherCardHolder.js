import { useState, useEffect, useContext } from "react";
import { GameContext } from "../GameContextProvider";
import { motion } from "framer-motion";
export default function OtherCardHolder({ no, styles,cards }) {
  const [name, setName] = useState("Player");
  const [cardsCount, setCardsCount] = useState([]);
  const {
    slot1,
    slot2,
    slot3,
    slot4,
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
    // var a = slotCards[no - 1];
    var b = [];
    for (var i = 0; i < cards; i++) b.push("a");
    setCardsCount(b);
  }, [cards]);
  return (
    <div className={styles + " bg-blue-700 gap-1"}>
      {name}
      {[...cardsCount].map((card)=><motion.div layout className="bg-white">yo</motion.div>)}
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { GameContext } from "../GameContextProvider";
import { motion } from "framer-motion";

export default function OtherCardHolder({ no, styles,cards,place }) {
  var full = "half_back.png";
  var side = "half_back_side.png";
  if (place == 2) {
    full = "left_half_back.png";
    side = "left_half_back_side.png";
  } else if (place == 3) {
    full = "right_half_back.png";
    side = "right_half_back_side.png";
  }
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
    <div className={styles}>
      <div className="text-sm min-w-[60px]">{name}</div>
      {[...cardsCount].map((card, index) => (
        <motion.div layout>
          <img
            className="h-full w-full"
            src={
              index == 0
                ? require(`./../cards/${full}`)
                : require(`./../cards/${side}`)
            }
          />
        </motion.div>
      ))}
    </div>
  );
}

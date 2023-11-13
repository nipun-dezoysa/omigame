import { useContext, useState, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import OtherCardHolder from "./OtherCardHolder";
import { motion } from "framer-motion";
import Card from "./Card";
import cardImg from "./playingcard.png";
export default function Game() {
  const a = [1, 2, 3, 4, 5, 6];
  const { myCards, gameStatus, userSlot, thurumpu, okbutt, setOkbutt } =
    useContext(GameContext);
  const [selectedCard, setSelectedCard] = useState("");
  const select = (data) => {
    setSelectedCard(data);
  };
  const ok = () => {
    if (gameStatus.status == "thowner") {
      thurumpu(selectedCard.type);
      setOkbutt(false);
    }
  };

  return (
    //playerslot = userslot - 4 -slot
    <div className="h-[100vh] w-full flex flex-col justify-between gap-5 ">
      <OtherCardHolder
        no={userSlot + 2 > 4 ? userSlot - 2 : userSlot + 2}
        styles={"w-full h-32 flex"}
      />
      <div className="flex justify-between">
        <OtherCardHolder
          no={userSlot + 3 > 4 ? userSlot - 1 : userSlot + 3}
          styles={"w-32 flex flex-col"}
        />
        <div className="flex justify-center items-center gap-2">
          <div className="w-[120px] h-[175px]">
            <img src={cardImg} alt="" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-[120px] h-[175px]">
              <img src={cardImg} alt="" />
            </div>
            <div className="w-[120px] h-[175px]">
              <img src={cardImg} alt="" />
            </div>
          </div>
          <div className="w-[120px] h-[175px]">
            <img src={cardImg} alt="" />
          </div>
        </div>
        <OtherCardHolder
          no={userSlot + 1 > 4 ? userSlot - 3 : userSlot + 1}
          styles={"w-32 flex flex-col"}
        />
      </div>
      <div className="flex gap-2 w-full h-[175px] justify-center relative flex-nowrap">
        {okbutt&&<input
          className="absolute top-[-60px] bg-cyan-900 py-3 px-10 text-white"
          type="button"
          value="OK"
          onClick={ok}
        />}
        <div className="flex w-full justify-center gap-1">
          {myCards.map((card, index) => {
            return (
              <Card
                key={index}
                myCards={myCards}
                selectS={select}
                card={card}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { GameContext } from "../GameContextProvider";
import OtherCardHolder from "./OtherCardHolder";
export default function Game() {
  const a = [1, 2, 3, 4, 5, 6];
  const { myCards, gameStatus, userSlot, thurumpu } = useContext(GameContext);
  const [selectedCard,setSelectedCard] = useState("");
  const select = (data)=>{
setSelectedCard(data);
  }
  const okbutt = () => {
    if (gameStatus.status == "thowner") {
        thurumpu(selectedCard.type);
    }
  };
  return (
    <div className="h-[100vh] w-full flex flex-col justify-between gap-5 bg-green-500">
      <OtherCardHolder
        no={userSlot + 2 > 4 ? userSlot - 2 : userSlot + 2}
        styles={"w-full h-32"}
      />
      <div className="flex justify-between">
        <OtherCardHolder
          no={userSlot + 3 > 4 ? userSlot - 1 : userSlot + 3}
          styles={"w-32"}
        />
        <OtherCardHolder
          no={userSlot + 1 > 4 ? userSlot - 3 : userSlot + 1}
          styles={"w-32"}
        />
      </div>
      <div className="flex gap-2 w-full h-32 bg-blue-700 justify-center relative">
        <input
          className="absolute top-[-60px] bg-cyan-900 py-3 px-10 text-white"
          type="button"
          value="OK"
          onClick={okbutt}
        />
        {myCards.map((card) => (
          <div
            key={card.type + card.value}
            className="w-20 h-32 bg-white flex justify-center items-center"
            onClick={()=>select(card)}
          >
            <h1>{card.type + " " + card.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

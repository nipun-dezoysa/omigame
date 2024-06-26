import { useState, useEffect, useContext } from "react";
import { GameContext } from "../GameContextProvider";
export default function Playerslot({ slotno, slot, setSlot }) {
  const [count, setCount] = useState(false);
  const { name, userSlot, setUserSlot, slotClick } = useContext(GameContext);
  const [style, setStyle] = useState(
    "flex flex-col items-center justify-center border border-slate-500 rounded-md text-slate-500 w-24 h-24 hover:bg-cyan-200 cursor-pointer animate-pulse"
  );
  const[owner,setOwner]=useState("");
  const [lable, setLable] = useState("Player");
  function click() {
    if (!slot) {
      if (userSlot == 0) {
        slotClick(1, slotno);
        setStyle(
          "flex flex-col items-center justify-center border-2 font-semibold border-cyan-700 rounded-md text-slate-500 w-24 h-24 bg-cyan-500 cursor-pointer"
        );
        setSlot({ name: name, player: "me" });
        setUserSlot(slotno);
      }
    } else if (slot.player == "me") {
      slotClick(0, slotno);
      setSlot(null);
      setStyle(
        "flex flex-col items-center justify-center border border-slate-500 rounded-md text-slate-500 w-24 h-24 hover:bg-cyan-200 cursor-pointer animate-pulse"
      );
      setUserSlot(0);
    }
  }
  useEffect(() => {
    if (slot) {
      setLable(slot.name);
      setStyle(
        "flex flex-col items-center justify-center border-2 rounded-md text-slate-500 w-24 h-24 text-white bg-cyan-500 cursor-pointer"
      );
      if(slot.player=="me")setOwner("(You)");
      else setOwner("");
    } else {
      setLable("Player " + slotno);
      setStyle(
        "flex flex-col items-center justify-center border border-slate-500 rounded-md text-slate-500 w-24 h-24 hover:bg-cyan-200 cursor-pointer animate-pulse"
      );
      setOwner("");
    }
  }, [slot]);
  return (
    <div className={style} type="button" value={lable} onClick={click}><h1>{lable}</h1><h1>{owner}</h1></div>
  );
}

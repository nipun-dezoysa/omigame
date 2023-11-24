import { cardsimg } from "../cards/cardlist";
import { useEffect,useState } from "react";
export default function Card({ selectS, card, style, selected }) {
  const imgsrc = cardsimg[card.type + card.value + ""];
  const [imgstyle, setImgstyle] = useState(
    "absolute w-[120px] lg:w-[120px] cursor-pointer hover:top-[-20px]"
  );
  useEffect(()=>{
    if(selected!=""){
      if (card.type == selected.type && card.value == selected.value) {
        setImgstyle(
          "absolute w-[120px] lg:w-[120px] cursor-pointer outline-none ring ring-violet-300 rounded-md hover:top-[-20px]"
        );
      }else{
        setImgstyle(
          "absolute w-[120px] lg:w-[120px] cursor-pointer hover:top-[-20px]"
        );
      }
    }
  },[selected]);
  return (
    <div className={style}>
      <img
        className={imgstyle}
        onClick={() => selectS(card)}
        src={require(`./../cards/${imgsrc}`)}
      />
    </div>
  );
}

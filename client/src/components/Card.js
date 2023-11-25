import { cardsimg } from "../cards/cardlist";
import { useEffect, useState } from "react";
export default function Card({ selectS, card, style, selected, subtrump }) {
  const imgsrc = cardsimg[card.type + card.value + ""];
  const [imgstyle, setImgstyle] = useState(
    "absolute shadow-lg w-[120px] lg:w-[120px] cursor-pointer hover:top-[-20px]"
  );
  function cardselect() {
    if (subtrump == "a" || subtrump == card.type) {
      selectS(card);
    }
  }
  useEffect(() => {
    if (selected != "") {
      if (card.type == selected.type && card.value == selected.value) {
        setImgstyle(
          "absolute shadow-lg w-[120px] lg:w-[120px] cursor-pointer outline-none ring ring-violet-300 rounded-md hover:top-[-20px]"
        );
      } else {
        if (subtrump == "a" || subtrump == card.type) {
          setImgstyle(
            "absolute shadow-lg w-[120px] lg:w-[120px] cursor-pointer outline-none ring ring-green-300 rounded-md hover:top-[-20px]"
          );
        } else {
          setImgstyle(
            "absolute shadow-lg w-[120px] lg:w-[120px] cursor-pointer hover:top-[-20px]"
          );
        }
      }
    }
  }, [selected]);
  useEffect(() => {
    if (subtrump == "a" || subtrump == card.type) {
      setImgstyle(
        "absolute shadow-lg w-[120px] lg:w-[120px] cursor-pointer outline-none ring ring-green-300 rounded-md hover:top-[-20px]"
      );
    } else {
      setImgstyle(
        "absolute shadow-lg w-[120px] lg:w-[120px] cursor-pointer hover:top-[-20px]"
      );
    }
  }, [subtrump]);
  return (
    <div className={style}>
      <img
        className={imgstyle}
        onClick={() => cardselect()}
        src={require(`./../cards/${imgsrc}`)}
      />
    </div>
  );
}

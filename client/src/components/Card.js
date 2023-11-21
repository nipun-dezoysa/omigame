import { motion } from "framer-motion";
import cardImg from "./playingcard.png";
import { useEffect, useState, useRef } from "react";
import cardsss from "../cards/7_of_hearts.png";
const cardsimg = {
  h7: "7_of_hearts.png",
  h8: "8_of_hearts.png",
  h9: "9_of_hearts.png",
  h10: "10_of_hearts.png",
  h11: "jack_of_hearts.png",
  h12: "queen_of_hearts.png",
  h13: "king_of_hearts.png",
  h14: "ace_of_hearts.png",
  c7: "7_of_clubs.png",
  c8: "8_of_clubs.png",
  c9: "9_of_clubs.png",
  c10: "10_of_clubs.png",
  c11: "jack_of_clubs.png",
  c12: "queen_of_clubs.png",
  c13: "king_of_clubs.png",
  c14: "ace_of_clubs.png",
  d7: "7_of_diamonds.png",
  d8: "8_of_diamonds.png",
  d9: "9_of_diamonds.png",
  d10: "10_of_diamonds.png",
  d11: "jack_of_diamonds.png",
  d12: "queen_of_diamonds.png",
  d13: "king_of_diamonds.png",
  d14: "ace_of_diamonds.png",
  s7: "7_of_spades.png",
  s8: "8_of_spades.png",
  s9: "9_of_spades.png",
  s10: "10_of_spades.png",
  s11: "jack_of_spades.png",
  s12: "queen_of_spades.png",
  s13: "king_of_spades.png",
  s14: "ace_of_spades.png",
};

export default function Card({ selectS, card, myCards }) {
  const imgsrc = cardsimg[card.type+card.value+""];
  const [styles, setStyles] = useState("relative shrink-0");
  const stylesRef = useRef(styles);
  const setStylesRef = (data) => {
    stylesRef.current = data;
    setStyles(data);
  };
  // useEffect(()=>{
  //     for(var i=0;i<myCards.length;i++){
  //         if((card.type==myCards[i].type)&&(card.value==myCards[i].value)){
  //             setStylesRef("relative shrink-0 left-[-"+i+"00px]");
  //             console.log(i,stylesRef,card);
  //         }
  //     }

  // },[myCards]);
  return (
    <div className="card">
      {/* <h1>{card.type + " " + card.value}</h1> */}
      <img
        className="cardimg"
        onClick={() => selectS(card)}
        src={require(`./../cards/${imgsrc}`)}
      />
    </div>
  );
}

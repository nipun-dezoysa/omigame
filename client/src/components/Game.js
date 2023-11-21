import { useContext, useState, useEffect, useRef } from "react";
import { GameContext } from "../GameContextProvider";
import OtherCardHolder from "./OtherCardHolder";
import { motion } from "framer-motion";
import Card from "./Card";
import cardImg from "./playingcard.png";
import { Socket } from "socket.io-client";
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
export default function Game() {
  const a = [1, 2, 3, 4, 5, 6];
  const {
    socket,
    myCards,
    setMyCards,
    gameStatus,
    userSlot,
    thurumpu,
    okbutt,
    setOkbutt,
    roomid,
    roundid,
    roundThurumpu,
    setRoundThurumpu,
  } = useContext(GameContext);
  const [selectedCard, setSelectedCard] = useState("");
  const [userThrow, setUserThrow] = useState(null);

  const [slot2Cards, setSlot2Cards] = useState(0);
  const slot2CardsRef = useRef(slot2Cards);
  const setSlot2CardsRef = (data) => {
    slot2CardsRef.current = data;
    setSlot2Cards(data);
  };
  const [slot3Cards, setSlot3Cards] = useState(0);
  const slot3CardsRef = useRef(slot3Cards);
  const setSlot3CardsRef = (data) => {
    slot3CardsRef.current = data;
    setSlot3Cards(data);
  };
  const [slot4Cards, setSlot4Cards] = useState(0);
  const slot4CardsRef = useRef(slot4Cards);
  const setSlot4CardsRef = (data) => {
    slot4CardsRef.current = data;
    setSlot4Cards(data);
  };

  const [slot2img, setSlot2img] = useState(null);
  const [slot3img, setSlot3img] = useState(null);
  const [slot4img, setSlot4img] = useState(null);

  const [ourAths, setOurAths] = useState(0);
  const [oppoAths, setOppoAths] = useState(0);

  const [ourPoints, setOurPoints] = useState(0);
  const [oppoPoints, setOppoPoints] = useState(0);

  const select = (data) => {
    setSelectedCard(data);
  };
  const ok = () => {
    if (selectedCard != "") {
      if (gameStatus.status == "thowner") {
        thurumpu(selectedCard.type);
      } else {
        var a = myCards.filter(
          (card) =>
            !(
              card.type == selectedCard.type && card.value == selectedCard.value
            )
        );
        setMyCards(a);
        setUserThrow(cardsimg[selectedCard.type + selectedCard.value + ""]);
        socket.emit("place_card", {
          card: selectedCard,
          slot: userSlot,
          roomid,
          roundid,
        });
      }
      setOkbutt(false);
      setSelectedCard("");
    }
  };

  useEffect(() => {
    socket.on("result", (data) => {
      setSlot2img(null);
      setSlot3img(null);
      setSlot4img(null);
      setUserThrow(null);
      if (data.status == "sub") {
        if (data.winner == userSlot % 2) {
          setOurAths(data.a);
          setOppoAths(data.b);
        } else {
          setOurAths(data.b);
          setOppoAths(data.a);
        }
      }
      if (data.status == "round") {
        setOurAths(0);
        setOppoAths(0);
        setRoundThurumpu(null);
        setSlot2CardsRef(0);
        setSlot3CardsRef(0);
        setSlot4CardsRef(0);
        if (data.winner == userSlot % 2) {
          setOurPoints(data.a);
          setOppoPoints(data.b);
        } else {
          setOurPoints(data.b);
          setOppoPoints(data.a);
        }
      }
      if (data.status == "seporu") {
        setOurAths(0);
        setOppoAths(0);
        setRoundThurumpu(null);
        setSlot2CardsRef(0);
        setSlot3CardsRef(0);
        setSlot4CardsRef(0);
      }
    });
    socket.on("slot_cards", (data) => {
      var s2 = userSlot + 1 < 5 ? userSlot + 1 : userSlot - 3;
      var s3 = userSlot + 2 < 5 ? userSlot + 2 : userSlot - 2;
      var s4 = userSlot + 3 < 5 ? userSlot + 3 : userSlot - 1;
      for (var i = 0; i < data.length; i++) {
        if (data[i].slot == s2) setSlot2CardsRef(data[i].count);
        if (data[i].slot == s3) setSlot3CardsRef(data[i].count);
        if (data[i].slot == s4) setSlot4CardsRef(data[i].count);
      }
    });
    socket.on("player_place_card", (data) => {
      console.log(data);
      var s2 = userSlot + 1 < 5 ? userSlot + 1 : userSlot - 3;
      var s3 = userSlot + 2 < 5 ? userSlot + 2 : userSlot - 2;
      var s4 = userSlot + 3 < 5 ? userSlot + 3 : userSlot - 1;
      if (data.slot == s2) {
        setSlot2img(cardsimg["" + data.type + data.value]);
        setSlot2CardsRef(slot2CardsRef.current - 1);
      }
      if (data.slot == s3) {
        setSlot3img(cardsimg["" + data.type + data.value]);
        setSlot3CardsRef(slot3CardsRef.current - 1);
      }
      if (data.slot == s4) {
        setSlot4img(cardsimg["" + data.type + data.value]);
        setSlot4CardsRef(slot4CardsRef.current - 1);
      }
    });
  }, [socket]);

  return (
    //playerslot = userslot - 4 -slot
    <div className="h-[100vh] w-full flex flex-col justify-between">
      <div>
        <div className="flex bg-slate-300 justify-between items-center p-1">
          <div>
            <h1 className="text-sm">Room ID</h1>
            <h1 className="text-xl font-bold">{roomid}</h1>
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col items-center">
              <h1 className="text-sm">Your Team</h1>
              <h1 className="text-xl font-bold">{ourAths}</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-sm">Opponent</h1>
              <h1 className="text-xl font-bold">{oppoAths}</h1>
            </div>
          </div>
          <div className="w-10">
            {roundThurumpu && (
              <img src={require(`./../cards/${roundThurumpu}.png`)} alt="" />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <OtherCardHolder
            place={1}
            no={userSlot + 2 > 4 ? userSlot - 2 : userSlot + 2}
            cards={slot3Cards}
            styles={"flex h-[60px] lg:h-[100px]"}
          />
          <h1>
            {ourPoints}:{oppoPoints}
          </h1>
        </div>
      </div>

      <div className="flex justify-between">
        <OtherCardHolder
          place={2}
          no={userSlot + 3 > 4 ? userSlot - 1 : userSlot + 3}
          cards={slot4Cards}
          styles={"flex flex-col w-[60px] lg:w-[100px] flex-col-reverse"}
        />
        <div className="flex justify-center items-center gap-2">
          <div className="w-[30%] md:w-[120px] md:h-[175px]">
            {slot4img && <img src={require(`./../cards/${slot4img}`)} alt="" />}
          </div>
          <div className="flex flex-col gap-3 w-[30%]">
            <div className="w-full h-[110px] md:w-[120px] md:h-[175px]">
              {slot3img && (
                <img src={require(`./../cards/${slot3img}`)} alt="" />
              )}
            </div>
            <div className="w-full h-[110px] md:w-[120px] md:h-[175px]">
              {userThrow && (
                <img src={require(`./../cards/${userThrow}`)} alt="" />
              )}
            </div>
          </div>
          <div className="w-[30%] md:w-[120px] md:h-[175px]">
            {slot2img && <img src={require(`./../cards/${slot2img}`)} alt="" />}
          </div>
        </div>
        <OtherCardHolder
          place={3}
          no={userSlot + 1 > 4 ? userSlot - 3 : userSlot + 1}
          cards={slot2Cards}
          styles={"flex flex-col w-[60px] lg:w-[100px] items-end"}
        />
      </div>
      <div className="flex gap-2 w-full h-[175px] justify-center relative flex-nowrap">
        {okbutt && (
          <input
            className="absolute top-[-60px] bg-cyan-900 py-3 px-10 text-white rounded-lg"
            type="button"
            value="OK"
            onClick={ok}
          />
        )}
        <div className="flex w-full  overflow-hidden lg:ustify-center">
          {myCards.map((card, index) => {
            return (
              <Card
                key={card.type + card.value}
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

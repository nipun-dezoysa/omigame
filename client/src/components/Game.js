import { useContext, useState, useEffect, useRef } from "react";
import { GameContext } from "../GameContextProvider";
import OtherCardHolder from "./OtherCardHolder";
import Card from "./Card";
import { motion } from "framer-motion";
import Closedcards from "./Closedcards";
import Pausescreen from "./Pausescreen";
import { cardsimg } from "../cards/cardlist";
export default function Game() {
  const {
    socket,
    myCards,
    setMyCards,
    gameStatus,
    userSlot,
    okbutt,
    setOkbutt,
    roomid,
    roundid,
    mycardRef,
    setcardRef,
  } = useContext(GameContext);
  const [selectedCard, setSelectedCard] = useState({ type: "k", value: 1 });
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

  const [pause, setPause] = useState(true);
  const [ptitle, setPtitle] = useState("");
  const [pmsg, setPmsg] = useState("Loading...");

  const [resultd, setResultd] = useState(false);
  const [rtitle, setRtitle] = useState("");
  const [rmsg, setRmsg] = useState("");
  const [rstyle, setRstyle] = useState("text-green-600");

  const [thOwner, setThOwner] = useState(0);
  const [roundThurumpu, setRoundThurumpu] = useState(null);

  const [last, setLast] = useState({ type: "k", value: 0 });
  const lastRef = useRef(last);
  const setLastRef = (data) => {
    lastRef.current = data;
    setLast(data);
  };

  var s2 = userSlot + 1 < 5 ? userSlot + 1 : userSlot - 3;
  var s3 = userSlot + 2 < 5 ? userSlot + 2 : userSlot - 2;
  var s4 = userSlot + 3 < 5 ? userSlot + 3 : userSlot - 1;

  const [kingType, setKingType] = useState("k");
  const [subTrump, setSubTrump] = useState("a");
  const subTrumpRef = useRef(subTrump);
  const setSubTrumpRef = (data) => {
    subTrumpRef.current = data;
    setSubTrump(data);
  };

  const [tempsub, setTempsub] = useState([]);
  const tempsubRef = useRef(tempsub);
  const setTempsubRef = (data)=>{
    tempsubRef.current = data;
    setTempsub(data);
  }
  const [oursub, setOursub] = useState(null);
  const [othersub, setOthersub] = useState(null);

  const select = (data) => {
    setSelectedCard(data);
  };
  const ok = () => {
    if (selectedCard.type != "k") {
      if (gameStatus.status == "thowner") {
        socket.emit("thurumpu", {
          thurumpu: selectedCard.type,
          roundid,
          roomid,
          slot: userSlot,
        });
        setPause(false);
        setRoundThurumpu(selectedCard.type);
      } else {
        setTempsubRef([
          ...tempsubRef.current,
          {
            img: cardsimg["" + selectedCard.type + selectedCard.value],
            slot: userSlot,
          },
        ]);
        var a = mycardRef.current.filter(
          (card) =>
            !(
              card.type == selectedCard.type && card.value == selectedCard.value
            )
        );
        setcardRef(a);
        setUserThrow(cardsimg[selectedCard.type + selectedCard.value + ""]);
        setKingType("k");
        socket.emit("place_card", {
          card: selectedCard,
          slot: userSlot,
          roomid,
          roundid,
        });
        
      }
      setOkbutt(false);
      setSelectedCard({ type: "k", value: 1 });
    }
  };

  function setSlotsEmpty() {
    setSlot2img(null);
    setSlot3img(null);
    setSlot4img(null);
    setUserThrow(null);
  }
  function resetGame() {
    setSlotsEmpty();
    setOurAths(0);
    setOppoAths(0);
    setRoundThurumpu(null);
    setSlot2CardsRef(0);
    setSlot3CardsRef(0);
    setSlot4CardsRef(0);
  }

  useEffect(() => {
    socket.on("throw_card", (data) => {
      if (data == userSlot) {
        setOkbutt(true);
        if (lastRef.current.type == "k") {
          setKingType("a");
        } else {
          var found = false;
          for (var i = 0; i < mycardRef.current.length; i++) {
            if (mycardRef.current[i].type == subTrumpRef.current) {
              found = true;
              break;
            }
          }
          if (found) {
            setKingType(subTrumpRef.current);
          } else {
            setKingType("a");
          }
        }
      }
    });
    socket.on("game_status", (data) => {
      if (data.status == "thowner") {
        setPmsg("");
        setThOwner(data.slot);
        if (data.slot == userSlot) {
          setKingType("a");
          setOkbutt(true);
          setPtitle("තුරුම්පු තෝරන්න");
        } else {
          setPtitle("තුරුම්පු තොරනකන් ඉන්න");
        }
        setPause(true);
      }
      if (data.status == "thurumpu") {
        setRoundThurumpu(data.thurumpu);
        setPause(false);
      }
      //round start weddi okkoma var tika reset karanna oni
    });
    socket.on("result", (data) => {
      setLastRef({ type: "k", value: 0 });
      if (data.status == "sub") {
        setTimeout(() => {
          setSlotsEmpty();
          console.log(tempsubRef.current);
          if (data.winner == userSlot % 2) {
            setOurAths(data.a);
            setOppoAths(data.b);
            setOursub(tempsubRef.current);
          } else {
            setOurAths(data.b);
            setOppoAths(data.a);
            setOthersub(tempsubRef.current);
          }
          if (data.slot == userSlot) {
            setKingType("a");
            setOkbutt(true);
            
          }
          setTempsubRef([]);
        }, 1000);
      }
      
      if (data.status == "round") {
        setTimeout(() => {
          resetGame();
          if (data.winner == userSlot % 2) {
            setOurPoints(data.a);
            setOppoPoints(data.b);
            setRtitle("අත දිනුම්");
            setRstyle("text-green-600");
            if (data.winType == 1) {
              setRmsg("තුරුම්පු කිව්වේ අපි");
            } else if (data.winType == 2) {
              setRmsg("තුරුම්පු කිව්වේ එයාලා");
            }
          } else {
            setOurPoints(data.b);
            setOppoPoints(data.a);
            setRtitle("අත පරාදයි");
            setRstyle("text-red-600");
            if (data.winType == 1) {
              setRmsg("තුරුම්පු කිව්වේ එයාලා");
            } else if (data.winType == 2) {
              setRmsg("තුරුම්පු කිව්වේ අපි");
            }
          }
          if (data.winType == 3) {
            setRmsg("කලින් අත සෙපෝරුයි");
          }
          setResultd(true);
          setTempsubRef([]);
          setTimeout(() => {
            setResultd(false);
          }, 3000);
        }, 1000);
      }
      if (data.status == "seporu") {
        setTimeout(() => {
          resetGame();
          setRtitle("අත සෙපෝරුයි");
          setRstyle("text-yellow-600");
          setRmsg("");
          setResultd(true);
          setTempsubRef([]);
          setTimeout(() => {
            setResultd(false);
          }, 3000);
        }, 1000);
      }
      
    });
    socket.on("slot_cards", (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].slot == s2) setSlot2CardsRef(data[i].count);
        if (data[i].slot == s3) setSlot3CardsRef(data[i].count);
        if (data[i].slot == s4) setSlot4CardsRef(data[i].count);
      }
    });
    socket.on("player_place_card", (data) => {
      if (
        lastRef.current.type != data.type ||
        lastRef.current.value != data.value
      ) {
        setTempsubRef([
          ...tempsubRef.current,
          { img: cardsimg["" + data.type + data.value] ,slot:data.slot},
        ]);
       
        if (lastRef.current.type == "k") {
          setSubTrumpRef(data.type);
        }
        setLastRef({ type: data.type, value: data.value });
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
              <h1 className="text-xl font-bold">{ourPoints}</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-sm">Opponent</h1>
              <h1 className="text-xl font-bold">{oppoPoints}</h1>
            </div>
          </div>
          <div className="w-10">
            {roundThurumpu && (
              <img src={require(`./../cards/${roundThurumpu}.png`)} alt="" />
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <OtherCardHolder
            place={1}
            no={userSlot + 2 > 4 ? userSlot - 2 : userSlot + 2}
            cards={slot3Cards}
            styles={"flex h-[60px] lg:h-[100px]"}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <OtherCardHolder
          place={2}
          no={userSlot + 3 > 4 ? userSlot - 1 : userSlot + 3}
          cards={slot4Cards}
          styles={
            "flex flex-col w-[60px] lg:w-[100px] flex-col-reverse items-start"
          }
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
      <Closedcards our={ourAths} oppo={oppoAths} oursub={oursub} othersub={othersub} />
      <div className="flex gap-2 w-full h-[175px] justify-center relative flex-nowrap">
        <div className="absolute top-[-220px] flex flex-col gap-1 h-[150px] justify-center">
          {resultd && <Pausescreen title={rtitle} msg={rmsg} style={rstyle} />}
          {pause && (
            <Pausescreen title={ptitle} msg={pmsg} style={"text-yellow-600"} />
          )}
        </div>

        {okbutt && (
          <input
            className={
              selectedCard.type != "k"
                ? "absolute top-[-60px] bg-green-600 py-3 px-10 text-white rounded-lg"
                : "absolute top-[-60px] bg-green-800 py-3 px-10 text-white rounded-lg"
            }
            type="button"
            value="OK"
            onClick={ok}
          />
        )}
        <div className="flex w-full  overflow-hidden justify-center">
          {myCards.map((card, index) => {
            var size = myCards.length;
            return (
              <Card
                key={card.type + card.value}
                style={size - 1 == index ? "lastcard" : "card"}
                selectS={select}
                card={card}
                selected={selectedCard}
                subtrump={kingType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

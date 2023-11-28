import Inputfield from "./Inputfield";
import Button from "./Button";
import Playerslot from "./Playerslot";
import { useState, useContext } from "react";
import { GameContext } from "../GameContextProvider";
import Game from "./Game";
import { useParams } from "react-router-dom";
export default function Gamelogger() {
  const {
    name,
    setName,
    id,
    setId,
    roomid,
    create,
    join,
    slot1,
    slot2,
    slot3,
    slot4,
    setSlot1,
    setSlot2,
    setSlot3,
    setSlot4,
    admin,
    gameStart,
    gameStatus,
  } = useContext(GameContext);
  const [iscreate, setIscreate] = useState(false);
  const [isjoined, setIsjoined] = useState(true);
  function logRoom() {
    if (iscreate) {
      create(name);
    } else {
      join(name, id);
    }
  }
  const {gid} = useParams();
  return (
    <div className="flex flex-col justify-between h-full">
      <div>{gid}</div>
      {gameStatus.status == "outside" && (
        <div className="flex flex-col w-96 rounded-lg bg-white mx-auto shadow-md overflow-hidden">
          {!roomid && (
            <div>
              <div className="flex justify-between ">
                <input
                  className="w-full bg-gray-100 py-3"
                  type="button"
                  value="Create"
                  onClick={() => setIscreate(true)}
                />
                <input
                  className="w-full py-3"
                  type="button"
                  value="Join"
                  onClick={() => setIscreate(false)}
                />
              </div>
              <div className="flex flex-col gap-2 px-4 py-5">
                <Inputfield
                  value={name}
                  setValue={setName}
                  lable={"Your Name"}
                />
                {!iscreate && (
                  <Inputfield
                    value={id}
                    setValue={(a) => setId(a.toUpperCase())}
                    lable={"Room ID"}
                  />
                )}
                <Button
                  text={iscreate ? "Create Room" : "Join Room"}
                  onClick={logRoom}
                />
              </div>
            </div>
          )}
          {roomid && (
            <div className="px-4 py-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm">Room ID</div>
                  <div className="text-2xl">{roomid}</div>
                </div>
                <input
                  type="button"
                  value="Leave"
                  className="bg-red-500 px-5 rounded-lg text-white cursor-pointer"
                  onClick={() => setIsjoined(false)}
                />
              </div>
              <div className="flex justify-evenly items-center">
                <div className="flex flex-col items-center gap-1">
                  <Playerslot slotno={1} slot={slot1} setSlot={setSlot1} />
                  <div>Team 1</div>
                  <Playerslot slotno={3} slot={slot3} setSlot={setSlot3} />
                </div>
                <div>VS</div>
                <div className="flex flex-col items-center gap-1">
                  <Playerslot slotno={2} slot={slot2} setSlot={setSlot2} />
                  <div>Team 2</div>
                  <Playerslot slotno={4} slot={slot4} setSlot={setSlot4} />
                </div>
              </div>
              {admin && <Button text={"Start"} onClick={gameStart} />}
            </div>
          )}
        </div>
      )}
      {gameStatus.status != "outside" && <Game />}

      
    </div>
  );
}

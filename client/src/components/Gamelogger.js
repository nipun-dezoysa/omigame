import Inputfield from "./Inputfield";
import Button from "./Button";
import Playerslot from "./Playerslot";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import Game from "./Game";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Gamelogger() {
  const navigate = useNavigate();
  const {
    name,
    setName,
    id,
    setId,
    roomid,
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
    socket,
    resetvalues,
  } = useContext(GameContext);
  const [iscreate, setIscreate] = useState(false);
  const [roomVerify, SetroomVerify] = useState(false);
  const { rid } = useParams();
  const join = () => {
    resetvalues();
    socket.emit("join_room", { name, room: rid });
  };
  useEffect(() => {
    socket.emit("roomdetails", { roomid: rid });
    if (roomid) {
      if (roomid == rid) {
        SetroomVerify(true);
      }
    }
  }, []);
  useEffect(() => {
    socket.on("roomdet", (data) => {
      SetroomVerify(data.status);
    });
  }, [socket]);
  return (
    <div className="flex flex-col justify-between h-full">
      {gameStatus.status == "outside" && (
        <div className="mt-20 flex flex-col w-[90%] md:w-96 rounded-lg bg-white mx-auto shadow-md overflow-hidden">
          {!roomVerify && <div>There is no room</div>}
          {roomVerify && (
            <div className="px-4 py-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm">Room ID</div>
                  <div className="text-2xl">{rid}</div>
                </div>
                <input
                  type="button"
                  value="Leave"
                  className="bg-red-500 px-5 rounded-lg text-white cursor-pointer"
                  onClick={() => navigate("/")}
                />
              </div>
              {roomid != rid && (
                <>
                  <Inputfield
                    value={name}
                    setValue={setName}
                    lable={"Your Name"}
                  />
                  <Button text={"Join Room"} onClick={join} />
                </>
              )}
              {roomid == rid && (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      )}
      {gameStatus.status != "outside" && <Game />}
    </div>
  );
}

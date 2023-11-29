import Inputfield from "./Inputfield";
import Button from "./Button";
import Playerslot from "./Playerslot";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import Game from "./Game";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdLink } from "react-icons/io";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
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
  const [btnwait, setbtnwait] = useState(false);
  const [roomVerify, SetroomVerify] = useState(false);
  const { rid } = useParams();
  const join = () => {
    resetvalues();
    setbtnwait(true);
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
    socket.on("logged", (data) => {
      if (data.status) {
        //do something mchn
      } else {
        setbtnwait(false);
        if (data.type == 1) {
          toast.error("Room is not available", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warn("Room is Full", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  }, [socket]);
  return (
    <div className="flex flex-col justify-between h-full">
      <ToastContainer />
      {gameStatus.status == "outside" && (
        <div className="mt-20 flex flex-col w-[90%] md:w-96 rounded-lg bg-white mx-auto shadow-md overflow-hidden">
          {!roomVerify && (
            <div className="px-4 py-5 flex items-center gap-2">
              <MdErrorOutline />
              There is no room
              <Link className="text-blue-600 underline" to="/">
                return to home page
              </Link>
            </div>
          )}
          {roomVerify && (
            <div className="px-4 py-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm">Room ID</div>
                  <div className="text-2xl flex items-center gap-1">
                    {rid}
                    <IoMdLink
                      className="text-gray-400 cursor-pointer"
                      onClick={() => {
                        copy("http://localhost:3000/game/" + rid);
                        toast.info("Copied", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }}
                    />
                  </div>
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
                  <Button
                    text={btnwait ? "Joining Room..." : "Join Room"}
                    onClick={join}
                    disabled={name == ""}
                    waiting={btnwait}
                  />
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
                  {admin && (
                    <Button
                      text={"Start"}
                      onClick={gameStart}
                      disabled={!slot1 || !slot2 || !slot3 || !slot4}
                    />
                  )}
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

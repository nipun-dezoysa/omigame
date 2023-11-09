import Inputfield from "./Inputfield";
import Button from "./Button";
import Playerslot from "./Playerslot";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
export default function Gamelogger() {
  const [iscreate, setIscreate] = useState(true);
  const [name, setName] = useState("");
  const [roomid, setRoomid] = useState("");
  const [isjoined, setIsjoined] = useState(true);
  return (
    <div className="flex flex-col w-96 rounded-lg bg-white m-5 shadow-md overflow-hidden">
      {!isjoined && (
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
            <Inputfield value={name} setValue={setName} lable={"Your Name"} />
            {!iscreate && (
              <Inputfield
                value={roomid}
                setValue={setRoomid}
                lable={"Room ID"}
              />
            )}
            <Button text={iscreate ? "Create Room" : "Join Room"} />
          </div>
        </div>
      )}
      {isjoined && (
        <div className="px-4 py-5 flex flex-col gap-2">
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Room ID</div>
              <div className="text-2xl">XJ87G</div>
            </div>
            <input
              type="button"
              value="Leave"
              className="bg-red-500 px-5 rounded-lg text-white cursor-pointer"
              onClick={() => setIsjoined(false)}
            />
          </div>
          <div className="flex justify-evenly items-center">
            <div className="flex flex-col gap-1">
              <Playerslot lable={"Player 1"} />
              <Playerslot lable={"Player 3"} />
            </div>
            <div>VS</div>
            <div className="flex flex-col gap-1">
              <Playerslot lable={"Player 2"} />
              <Playerslot lable={"Player 4"} />
            </div>
          </div>
          <Button text={"Start"} />
        </div>
      )}
    </div>
  );
}

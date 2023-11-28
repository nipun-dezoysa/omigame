import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import { useState, useContext } from "react";
import { GameContext } from "../GameContextProvider";
export default function Main() {
  const {
    name,
    setName,
    id,
    setId,
    create,
    join,
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
  return (
    <div className="flex flex-col w-96 rounded-lg bg-white mx-auto shadow-md overflow-hidden">
      <div>
        <div className="flex justify-between ">
          <input
            className={
              iscreate
                ? "w-full  py-3 cursor-pointer"
                : "w-full bg-gray-100 py-3 cursor-pointer"
            }
            type="button"
            value="Create"
            onClick={() => setIscreate(true)}
          />
          <input
            className={
              !iscreate
                ? "w-full  py-3 cursor-pointer"
                : "w-full bg-gray-100 py-3 cursor-pointer"
            }
            type="button"
            value="Join"
            onClick={() => setIscreate(false)}
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-5">
          <Inputfield value={name} setValue={setName} lable={"Your Name"} />
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
    </div>
  );
}

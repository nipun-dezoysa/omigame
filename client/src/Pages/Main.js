import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Main() {
  const navigate = useNavigate();
  const { socket, name, setName, id, setId, resetvalues } =
    useContext(GameContext);
  const [iscreate, setIscreate] = useState(false);
  function logRoom() {
    resetvalues();
    if (iscreate) {
      socket.emit("create_room", { name });
    } else {
      socket.emit("join_room", { name, room:id });
    }
  }
  useEffect(()=>{
    socket.emit("userrest", "reset");
  },[]);
  useEffect(()=>{
    socket.on("logged", (data) => {
      if(data.status){
        navigate("/game/"+data.roomid);
      }else{
        toast.error("🦄 Wow so easy!", {
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
    });
  },[socket]);
  return (
    <div className="mt-20 flex flex-col w-[90%] md:w-96 rounded-lg bg-white mx-auto shadow-md overflow-hidden">
      <ToastContainer />
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

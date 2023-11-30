import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bs1Circle } from "react-icons/bs";
export default function Main() {
  const navigate = useNavigate();
  const { socket, name, setName, id, setId, resetvalues, usercount } =
    useContext(GameContext);
  const [iscreate, setIscreate] = useState(false);
  const [btnwait, setbtnwait] = useState(false);
  const [btnwait1, setbtnwait1] = useState(false);
  
  function logRoom() {
    resetvalues();
    if (iscreate) {
      setbtnwait1(true);
      socket.emit("create_room", { name });
    } else {
      setbtnwait(true);
      socket.emit("join_room", { name, room: id });
    }
  }
  useEffect(() => {
    socket.emit("userrest", "reset");
  }, []);
  useEffect(() => {
    
    socket.on("logged", (data) => {
      if (data.status) {
        navigate("/game/" + data.roomid);
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
    <div className="flex flex-col items-center py-32 gap-6 bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply relative">
      <div>
        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          {usercount} online players
        </span>
        <h1 className="text-6xl font-bold text-white">
          OMI
          <span class="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            GAME
          </span>
        </h1>
      </div>
      <div className="flex flex-col w-[90%] md:w-96 rounded-lg bg-white mx-auto shadow-md overflow-hidden absolute bottom-[-170px]">
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
            {iscreate && (
              <Button
                text={btnwait1 ? "Creating Room..." : "Create Room"}
                disabled={name == ""}
                onClick={logRoom}
                waiting={btnwait}
              />
            )}
            {!iscreate && (
              <>
                <Inputfield
                  value={id}
                  setValue={(a) => setId(a.toUpperCase())}
                  lable={"Room ID"}
                />
                <Button
                  text={btnwait ? "Joining Room..." : "Join Room"}
                  disabled={name == "" || id == ""}
                  onClick={logRoom}
                  waiting={btnwait}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

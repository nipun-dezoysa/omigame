import Inputfield from "../components/Inputfield";
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameContextProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <>
      <div className="flex flex-col items-center py-32 gap-6 bg-center bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibkDUHuWMsArPG9uZJYRDHVvRUMk6gmtG-4jdcRQuqUTpxqUyKgancpjzNvbDSYzpLpWRZ1ZpsO4ETNAzsPWg7i-QxIguTI7jTx3gBq4lpc-D-C_EEdA10syJ3vla0fHUzZ5vwMNhWp6G9R8f2FlYqSCB3hbRCsmyEWrlL3E8oTvkP_n3yRD6CkV-LQvA/s1920/cover.jpg')] bg-gray-700 bg-blend-multiply relative">
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
      <div className="mt-[180px] flex flex-col items-center mb-1 gap-1">
        <ol class="flex items-center text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base lg:w-[550px]">
          <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Create/Join <span class="hidden sm:inline-flex sm:ms-2">Room</span>
            </span>
          </li>
          <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span class="me-2">2</span>
              Account <span class="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>
          <li class="flex items-center">
            <span class="me-2">3</span>
            Confirmation
          </li>
        </ol>
        <div className="p-5 max-w-[500px] w-[90%] bg-center bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibkDUHuWMsArPG9uZJYRDHVvRUMk6gmtG-4jdcRQuqUTpxqUyKgancpjzNvbDSYzpLpWRZ1ZpsO4ETNAzsPWg7i-QxIguTI7jTx3gBq4lpc-D-C_EEdA10syJ3vla0fHUzZ5vwMNhWp6G9R8f2FlYqSCB3hbRCsmyEWrlL3E8oTvkP_n3yRD6CkV-LQvA/s1920/cover.jpg')] bg-gray-700 bg-blend-multiply rounded-lg">
          <h1 className="text-white font-bold text-xl">OMI GAME</h1>
          <p className="text-white font-mono text-sm">
            Welcome to OMIGAME inspired by the classic Sri Lankan card game,
            Omi! Designed for four players, the objective is simple yet
            engaging—be the first team to score above 10 points to claim...
          </p>
          <div className="text-slate-400 mt-1 shadow-lg bg-slate-900 w-24 flex justify-center p-1 rounded-lg">
            Read More
          </div>
        </div>
      </div>
    </>
  );
}

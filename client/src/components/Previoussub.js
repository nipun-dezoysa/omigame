import Preimg from "./Preimg";
import { IoMdCloseCircleOutline } from "react-icons/io";
export default function Previoussub({ sub ,setPre}) {
  return (
    <div className="fixed z-50 top-0 left-0 h-[100vh] w-full flex justify-center items-center">
      <div className="bg-white relative rounded-lg p-3 shadow-lg">
        <div className="absolute right-1 top-1 text-2xl cursor-pointer" onClick={()=>setPre(false)}>
          <IoMdCloseCircleOutline />
        </div>
        <h1>Previous Round</h1>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <Preimg src={sub[0]} />
            <Preimg src={sub[1]} />
          </div>
          <div className="flex gap-2">
            <Preimg src={sub[2]} />
            <Preimg src={sub[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}

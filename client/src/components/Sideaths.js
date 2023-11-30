import { useState, useEffect } from "react";
import Previoussub from "./Previoussub";
export default function Sideaths({ count, sub,title }) {
  const [side, setSide] = useState([]);
  const[pre,setPre] = useState(false);
  useEffect(() => {
    var a = [];
    for (var i = 0; i < count; i++) a.push("a");
    setSide(a);
  }, [count]);
  return (
    <div className="flex">
      {pre&&<Previoussub sub={sub} setPre={setPre} title={title}/>}
      {side.map((card, index) => {
        return (
          <img
            className="h-[120px] cursor-pointer"
            onClick={() => setPre(true)}
            src={
              index == side.length - 1
                ? require(`./../cards/back.png`)
                : require(`./../cards/back_side.png`)
            }
          />
        );
      })}
    </div>
  );
}

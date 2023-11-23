import { useState, useEffect } from "react";
export default function Sideaths({ count }) {
  const [side, setSide] = useState([]);
  useEffect(() => {
    var a = [];
    for (var i = 0; i < count; i++) a.push("a");
    setSide(a);
  }, [count]);
  return (
    <div className="flex">
      {side.map((card, index) => {
        return (
          <img
            className="h-[120px]"
            src={
              index == side.length-1
                ? require(`./../cards/back.png`)
                : require(`./../cards/back_side.png`)
            }
          />
        );
      })}
    </div>
  );
}

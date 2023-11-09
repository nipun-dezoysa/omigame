import { useState, useRef, useEffect } from "react";
export default function Inputfield({ value, setValue, lable, width }) {
  const [visible, setVisible] = useState("hidden");
  const [psize, setPsize] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (value != "") {
      setVisible("text");
      setPsize("-sm");
    }
  }, [value]);
  return (
    <div
      className={
        "border border-slate-500 focus:border-slate-700 px-3 rounded-md h-14 flex flex-col justify-center " +
        width
      }
    >
      <p
        className={"text-slate-500 text" + psize}
        onClick={() => {
          setVisible("text");
          setPsize("-sm");
          setTimeout(() => inputRef.current.focus(), 100);
        }}
      >
        {lable}
      </p>

      <input
        className="text-slate-900 outline-none w-full font-medium"
        type={visible}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (value == "") {
            setVisible("hidden");
            setPsize("");
          }
        }}
        ref={inputRef}
      />
    </div>
  );
}

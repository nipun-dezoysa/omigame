import { useEffect, useState } from "react";
export default function Button({ text, onClick, disabled, waiting }) {
  const [style, setStyle] = useState(
    "py-2 rounded-md font-semibold text-lg text-white bg-green-600 hover:bg-green-800 cursor-pointer block"
  );
  useEffect(() => {
    if (waiting) {
      setStyle(
        "py-2 rounded-md font-semibold text-lg text-white bg-green-800 cursor-wait"
      );
    } else if (disabled) {
      setStyle(
        "py-2 rounded-md font-semibold text-lg text-white bg-green-800 cursor-not-allowed block"
      );
    } else {
      setStyle(
        "py-2 rounded-md font-semibold text-lg text-white bg-green-600 hover:bg-green-800 cursor-pointer block"
      );
    }
  }, [disabled, waiting]);
  return (
    <input
      className={
        style
      }
      disabled={disabled}
      type="button"
      onClick={onClick}
      value={text}
    />
  );
}

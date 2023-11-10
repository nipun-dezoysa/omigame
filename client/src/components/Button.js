
export default function Button({ text, onClick }) {
  return (
    <input
      className={
        "py-2 rounded-md font-semibold text-lg text-white bg-green-600 hover:bg-green-800 cursor-pointer block"
      }
      type="button"
      onClick={onClick}
      value={text}
    />
  );
}

import Sideaths from "./Sideaths";
export default function Closedcards({our, oppo}) {
  return (
    <div className="w-full h-[120px] flex justify-between px-2">
      <Sideaths count={our} />
      <Sideaths count={oppo} />
    </div>
  );
}

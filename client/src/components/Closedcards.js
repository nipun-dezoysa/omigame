import Sideaths from "./Sideaths";
export default function Closedcards({our, oppo,oursub,othersub}) {
  return (
    <div className="w-full h-[120px] flex justify-between px-2 my-2">
      <Sideaths count={our} sub={oursub} title={"අපේ අන්තිම අත"} />
      <Sideaths count={oppo} sub={othersub} title={"එයාලගෙ අන්තිම අත"} />
    </div>
  );
}

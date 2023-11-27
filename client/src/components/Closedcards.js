import Sideaths from "./Sideaths";
export default function Closedcards({our, oppo,oursub,othersub}) {
  return (
    <div className="w-full h-[120px] flex justify-between px-2 my-2">
      <Sideaths count={our} sub={oursub}/>
      <Sideaths count={oppo} sub={othersub} />
    </div>
  );
}

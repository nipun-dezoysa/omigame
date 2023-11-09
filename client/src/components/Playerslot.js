export default function Playerslot({lable,color}){
    return (
      <input
        className={"border border-slate-500 rounded-md text-slate-500 w-24 h-24 hover:bg-cyan-200"}
        type="button"
        value={lable}
      />
    );
}
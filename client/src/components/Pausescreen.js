import { motion } from "framer-motion";
export default function Pausescreen({ type, title, msg,style }) {
  return (
    <motion.div
      layout
      className="bg-white p-5 rounded-xl flex flex-col items-center shadow-lg "
    >
      <h1 className={"text-lg lg:text-2xl font-bold "+style}>{title}</h1>
      <h1 className="text-md font-bold">{msg}</h1>
    </motion.div>
  );
}

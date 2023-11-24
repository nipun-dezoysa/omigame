import { motion } from "framer-motion";
export default function Pausescreen({ type, title, msg }) {
  return (
    <motion.div layout className="bg-white w-64 p-5 rounded-xl flex flex-col items-center shadow-lg ">
      <h1 className="text-2xl font-bold text-green-600">{title}</h1>
      <h1 className="text-lg font-bold">{msg}</h1>
    </motion.div>
  );
}

import { motion } from "framer-motion";

const AnimatedShapes = () => {
  return (
    <div className="relative w-full">
      <motion.div
        className="absolute right-8 w-8 h-8 bg-cyan-  bg-amber-300 cercle2 rounded-full"
        animate={{ y: [0, 200, 0], x: [0, -100, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute right-8 w-8 h-8 bg-cyan-400 cercle rounded-full"
        animate={{ y: [0, 200, 0], x: [0, -150, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      {/*  */}
      <motion.div
        className="absolute left-8 w-8 h-8 bg-cyan-400  cercle rounded-full"
        animate={{ y: [0, 200, 0], x: [0, 100, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute left-8 w-8 h-8 bg-amber-300 cercle2 rounded-full"
        animate={{ y: [0, 200, 0], x: [0, 180, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

export default AnimatedShapes;

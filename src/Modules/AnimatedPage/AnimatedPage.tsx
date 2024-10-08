import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    animations: string,
    initial: string,
    animate: string,
    exit: string,
    children: React.ReactNode;

}

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
}

 const AnimatedPage = ({ children }: Props)=> {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
export default AnimatedPage





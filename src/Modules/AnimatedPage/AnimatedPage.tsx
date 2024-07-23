import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    animations: string,
    initial: string,
    animate: string,
    exit: string,

}

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
}

export default function AnimatedPage({ childern }: Props) {
    return (

        <motion.dev 
        variants={animations}
         initial="initial"
          animate="animate"
           exit="exit"
           >
    { childern }


        </motion.dev >

    )
}
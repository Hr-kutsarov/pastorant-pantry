'use client'

import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from 'framer-motion';

export default function NavMenuModule() {
    const spanStyles = 'flex w-full h-full';

    return (
        <span className={twMerge(spanStyles)}>
            {/* span menu here */}
            {/* <AnimatePresence>
                <motion.div
                    initial={{
                        y: '-100px'
                    }}
                    animate={{
                        y: '0px'
                    }}
                    transition={{
                        duration: 1.4, 
                        type: 'spring',
                        ease: 'backInOut'
                    }}
                    exit={{opacity: 0}}>
                    <h2>menu</h2>
                </motion.div>
            </AnimatePresence> */}
            
        </span>
    )
}

'use client'

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function LoadingDotsAnimation() {

    const animationStyles = ' flex w-full h-full items-center justify-center h-8 w-8 bg-slate-200 rounded-2xl';
    return (
        <span className='flex justify-center p-4 items-center gap-4 absolute top-[37vh] w-screen bg-transparent'>
            <motion.span
            className={twMerge(animationStyles)}
            initial={{ y: -20, scale: 0.5, opacity: 0.4 }}
            animate={{ y: 20, scale: 1, opacity: 1}}
            transition={{
                duration: 1.4,
                delay: 0.1,
                repeat: Infinity,
                repeatType: 'mirror'
            }}
            >

            </motion.span>
            <motion.span
            className={twMerge(animationStyles)}
            initial={{ y: -20, scale: 0.5, opacity: 0.4 }}
            animate={{ y: 20, scale: 1, opacity: 1}}
            transition={{
                duration: 1.4,
                delay: 0.3,
                repeat: Infinity,
                repeatType: 'mirror'
            }}
            >

            </motion.span>
            <motion.span
            className={twMerge(animationStyles)}
            initial={{ y: -20, scale: 0.5, opacity: 0.4 }}
            animate={{ y: 20, scale: 1, opacity: 1}}
            transition={{
                duration: 1.4,
                delay: 0.5,
                repeat: Infinity,
                repeatType: 'mirror'
            }}
            >

            </motion.span>
        </span>
    )
}
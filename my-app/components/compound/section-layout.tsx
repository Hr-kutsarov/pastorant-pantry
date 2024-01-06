'use client'

import { twMerge } from "tailwind-merge"
import { motion, AnimatePresence } from "framer-motion"

export default function SectionLayout({ children }: {children: React.ReactNode}) {
    return (
        <AnimatePresence>
            <motion.section 
            initial={{y: 20}}
            animate={{y: 0}}
            transition={{ease: 'easeIn', duration: 0.7, delay: 0.1}}
            className={twMerge('bg-slate-200/10 w-full h-full mb-4 flex flex-col rounded-lg shadow-md')}>
                {children}
            </motion.section>
        </AnimatePresence>
    )
}

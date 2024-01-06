'use client';

import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion";
import { GiBookmarklet } from "react-icons/gi";

export default function NavLogoModule() {
    // component styles
    const spanStyles = 'flex items-center justify-center text-slate-200';
    // 
    return (
        <motion.span 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
            delayChildren: 1.5
        }}
        className={
            twMerge(spanStyles)
        }>
            {/* span menu here */}
                <GiBookmarklet size={36} />
        </motion.span>
    )
}

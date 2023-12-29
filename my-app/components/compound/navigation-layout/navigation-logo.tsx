'use client'
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion";
import { GiBookmarklet } from "react-icons/gi";

export default function NavLogoModule() {
    // component styles
    const spanStyles = 'bg-transparent group relative border-1 border-slate-50 flex aspect-square w-full max-w-[190px] max-h-[60px] h-full justify-center items-center';

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
        className={twMerge(spanStyles)}>
            
            {/* span menu here */}
            <p className="text-lg font-bold tracking-wide text-slate-50">Pastorant pantry</p>
        </motion.span>
    )
}

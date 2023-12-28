'use client'
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion";
import { GiBookmarklet } from "react-icons/gi";

export default function NavLogoModule() {
    const spanStyles = 'bg-transparent group relative border-1 border-slate-50 flex aspect-square w-full max-w-[210px] max-h-[90px] h-full justify-center items-center';

    return (
        <motion.span className={twMerge(spanStyles)}>
            {/* span menu here */}
            <p className="text-2xl font-bold tracking-tight text-slate-50">Pastorant pantry</p>
        </motion.span>
    )
}

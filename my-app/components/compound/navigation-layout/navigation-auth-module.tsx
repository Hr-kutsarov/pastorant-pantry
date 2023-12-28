'use client'

import {motion} from 'framer-motion';
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge"
import { RxTarget } from 'react-icons/rx'

export default function NavAuthModule() {
    const spanStyles = 'flex bg-transparent rounded-full w-auto h-full items-center justify-end';

    return (
        <motion.span 
            // hover effects
            whileHover={{ scale: 1.1 }}
            // whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{
              scale: 0.9,
            }}
            // styles
            className={twMerge(spanStyles)}>
            {/* span menu here */}
            <Button variant='action'>
                <RxTarget size={28} />
                See orders
            </Button>
        </motion.span>
    )
}

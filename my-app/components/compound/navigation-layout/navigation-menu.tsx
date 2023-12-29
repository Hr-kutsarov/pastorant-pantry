'use client'

import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from 'framer-motion';
import NavMenuItem from "./navigation-menu-item";
import { HiHome } from 'react-icons/hi'
import { Tb24Hours } from "react-icons/tb";
import { HiWrenchScrewdriver, HiMiniAtSymbol } from 'react-icons/hi2'

import { usePathname } from 'next/navigation'

export default function NavMenuModule() {
    const spanStyles = 'flex w-full h-full gap-2 items-center';
    const testStyles = 'min-h-[60px]  min-w-[300px]'

    // path name
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Orders',
            active: pathname == '/',
            href: '/'
        },
        {
            icon: HiWrenchScrewdriver,
            label: 'Settings',
            active: pathname === '/search',
            href: '/search'
        },
        {
            icon: Tb24Hours,
            label: 'Auth',
            active: pathname === '/auth',
            href: '/auth'
        },
    ], [pathname])

    return (
        <span className={twMerge(spanStyles, testStyles)}>
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
            {routes.map((route) => (<NavMenuItem key={route.label} {...route} />))}
        </span>
    )
}

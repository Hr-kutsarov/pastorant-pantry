import { IconType } from 'react-icons'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion';

interface NavItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const NavMenuItem: React.FC<NavItemProps> = ({
    icon: Icon, 
    label, 
    active, 
    href,
}) => {
    // styles
    const linkStyles = 'flex min-h-[60px] items-center justify-center min-w-[42px] gap-1 font-semibold text-sm text-slate-400 hover:text-slate-200 group relative';

    return ( 
        <motion.span
            whileHover={{ scale: 1 }}
            whileTap={{
            scale: 1.2,
            // rotate: 360,
            // borderRadius: "100%"
        }}
        >
            <Link href={href} className={twMerge(linkStyles)}>
                    <Icon size={24}/>
                    {/* {active ? <p className='text-lg font-semibold'>{label}</p> : null} */}
            </Link>
        </motion.span>
     );
}
 
export default NavMenuItem;
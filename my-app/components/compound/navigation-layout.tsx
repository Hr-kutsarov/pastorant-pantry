import { twMerge } from "tailwind-merge"

export default function NavLayout({ children }: {children: React.ReactNode}) {
    const navStyles = 'bg-transparent mb-4 flex items-center justify-between p-2';

    return (
        <nav className={twMerge(navStyles)}>
            {children}
        </nav>
    )
}

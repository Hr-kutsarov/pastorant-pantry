import { twMerge } from "tailwind-merge"

export default function PageLayout({ children }: {children: React.ReactNode}) {
    return (
        <span className={twMerge('bg-slate-800 w-full min-h-screen flex flex-col px-4 py-4 md:px-20 lg:px-40')}>
            {children}
        </span>
    )
}

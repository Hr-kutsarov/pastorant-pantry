import { twMerge } from "tailwind-merge"

export default function PageLayout({ children }: {children: React.ReactNode}) {
    return (
        <span className={twMerge('bg-slate-800 w-full min-h-screen flex flex-col p-4 items-center')}>
            {children}
        </span>
    )
}

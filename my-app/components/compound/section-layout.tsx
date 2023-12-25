import { twMerge } from "tailwind-merge"

export default function SectionLayout({ children }: {children: React.ReactNode}) {
    return (
        <section className={twMerge('bg-slate-200 w-full h-full flex flex-col p-2 lg:p-4 rounded-2xl shadow-md')}>
            {children}
        </section>
    )
}

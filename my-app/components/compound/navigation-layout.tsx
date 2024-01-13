// import libs
import { twMerge } from "tailwind-merge"

// import components
import NavLogoModule from "@/components/compound/navigation-layout/navigation-logo";
import NavMenuModule from "@/components/compound/navigation-layout/navigation-menu";
import NavAuthModule from "@/components/compound/navigation-layout/navigation-auth-module";

    {/* server  component containing three client components \\
    (animated logo, nav menu and trigger buttons)*/}

export default function NavLayout() {
    const navStyles = 'bg-transparent flex items-center gap-4 mb-4 max-w-[960px] w-full';

    return (
        <nav className={twMerge(navStyles)}>
            <NavLogoModule />
            <NavMenuModule />
            <NavAuthModule />
        </nav>
    )
}

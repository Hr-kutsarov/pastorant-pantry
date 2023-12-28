import { twMerge } from "tailwind-merge"
import NavLogoModule from "@/components/compound/navigation-layout/navigation-logo";
import NavMenuModule from "@/components/compound/navigation-layout/navigation-menu";
import NavAuthModule from "@/components/compound/navigation-layout/navigation-auth-module";

export default function NavLayout() {
    const navStyles = 'bg-transparent flex items-center gap-4 mb-4';

    return (
        <nav className={twMerge(navStyles)}>
            <NavLogoModule />
            <NavMenuModule />
            <NavAuthModule />
        </nav>
    )
}

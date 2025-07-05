"use client"
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { settings } from "@/config/settings";
import { usePathname } from 'next/navigation'
import Styles from "./style.module.css"

export default function TopNavbar() {
    const pathname = usePathname()
    console.log(pathname);

    return (
        <>
            <Navbar className={`${Styles.navbar} h-12`} position="sticky">
                {
                    pathname != "/" ? (
                        <NavbarBrand>
                            
                        </NavbarBrand>

                    ) : ""
                }
                <NavbarContent>
                    <p className="font-bold text-2xl tracking-wider text-inherit text-center m-auto">{settings.title}</p>
                </NavbarContent>
            </Navbar>

        </>
    )
}
"use client"
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { settings } from "@/config/settings";
import { usePathname } from 'next/navigation'
import { GeriIcon } from "@/public/icon.jsx"
import Styles from "./style.module.css"

export default function TopNavbar() {
    const pathname = usePathname()
    console.log(pathname);

    return (
        <>
            <Navbar className={`${Styles.navbar} h-12 flex justify-between `} position="sticky">
                {
                    pathname != "/" ? (
                            <Button isIconOnly className="w-10"  aria-label="geri" variant="light" color="primary">
                                <GeriIcon />
                            </Button>

                    ) : ""
                }
                    <NavbarContent className="m-auto">
                        <p className="font-bold text-2xl tracking-wider text-inherit text-center m-auto w-max">{settings.title}</p>
                    </NavbarContent>
                {
                    pathname != "/" ? (<div className="size-10" />) : ""
                }
            </Navbar>


        </>
    )
}
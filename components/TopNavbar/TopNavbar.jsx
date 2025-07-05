
import { Navbar } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { settings } from "@/config/settings";
import { GeriIcon } from "@/public/icon.jsx"
import Styles from "./style.module.css"
import Link from "next/link";

export default async function TopNavbar({ pathname = "/" }) {
"px-6 kaldır menü için"
    console.log(pathname);

    return (
        <>
            <Navbar className={`${Styles.navbar} h-12 flex flex-col justify-between items-center px-0 `} >
                {
                    pathname != "/" ? (
                        <Link replace prefetch href="/" className="size-10">
                        <Button isIconOnly className="size-10" aria-label="geri" variant="light" color="primary">
                            <GeriIcon />
                        </Button>
                        </Link>

                    ) : <div className="size-10" />
                }
                <div>
                        <p className="font-bold text-2xl tracking-wider text-inherit text-center m-auto">{settings.title}</p>
                </div>

                <div className="size-10" />

            </Navbar>


        </>
    )
}
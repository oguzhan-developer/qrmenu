
import { Navbar } from "@heroui/navbar";
import { settings } from "@/config/settings";
import GeriButton from "@/components/GeriButton/GeriButton"
import Styles from "./style.module.css"

export default function TopNavbar({ pathname = "/" }) {
    return (
        <>
            <Navbar className={`${Styles.navbar} h-12 flex flex-col justify-between items-center px-0 `} >
                {
                    pathname != "/" ? <GeriButton /> : <div className="ml-2 size-10" />
                }
                <div>
                    <p className="font-bold text-2xl tracking-wider text-inherit text-center m-auto">
                        {
                            pathname == "/" ?
                                settings.title : pathname.split("/")[2]}
                    </p>
                </div>

                <div className="size-10" />

            </Navbar>


        </>
    )
}
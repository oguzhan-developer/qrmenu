
import { Navbar, NavbarBrand} from "@heroui/navbar";
import { settings } from "@/config/settings";
import Styles from "./style.module.css"
export default function TopNavbar() {
    return (
        <>
            <Navbar className={`${Styles.navbar} h-12`}>
                <NavbarBrand>
                        <p className="font-bold text-2xl tracking-wider text-inherit text-center m-auto">{settings.title}</p>
                </NavbarBrand>
            </Navbar>

        </>
    )
}
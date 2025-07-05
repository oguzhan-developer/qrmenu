// import { Alert } from "@heroui/alert";
import Styles from "./style.module.css"
export default function Banner() {
    return (
        <>
            <div className={`${Styles.container} w-fit flex justify-center m-auto text-center font-bold p-1 min-w-fit px-4 whitespace-nowrap mt-4 my-0`}>
                <div>
                    Hoşgeldiniz, WiFi Şifresi: Kahve1234
                </div>
            </div>
        </>
    )
}
// import { Alert } from "@heroui/alert";
import Styles from "./style.module.css"
import { getDuyuru } from "@/lib/database";

export default async function Banner() {
    const { isDuyuruAktif, duyuruMesaj } = await getDuyuru();

    return (
        <>
            {
                isDuyuruAktif && (
                    <div className={`${Styles.container} w-fit flex justify-center m-auto text-center font-bold p-1 min-w-fit px-4 whitespace-nowrap mt-4 my-0`}>
                        <div className="text-sm">
                            {duyuruMesaj}
                        </div>
                    </div>
                )
            }

        </>
    )
}
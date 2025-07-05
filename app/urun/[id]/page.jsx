import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx"
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import Styles from "./style.module.css"
import UrunCard from "../../../components/UrunCard/UrunCard";

export default async function UrunPage({ params }) {
    const { id } = await params;
    return (
        <>
            <TopNavbar pathname={`/urun/${id}`} />
            <div className={`${Styles.container} justify-center m-auto mt-2`}>
                <UrunCard />
                <UrunCard />
            </div>
        </>
    )
}
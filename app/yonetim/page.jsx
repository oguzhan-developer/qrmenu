import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { Button } from "@heroui/button";
import Link from "next/link";
import Styles from "./style.module.css";
export default async function Yonetim() {
    return (
        <>
            <TopNavbar title="Yönetim Sayfası" />
            <div className="w-full flex flex-col items-center justify-center mt-5">
                    <Button as={Link} href="/yonetim/kategoriler" color="primary" variant="flat" className="m-1 min-w-min w-1/4 px-5">Kategorileri Düzenle</Button>
                    <Button as={Link} href="/yonetim/urunler" color="primary" variant="flat" className="m-1 min-w-min w-1/4 px-5">Ürünleri Düzenle</Button>
                    <Button as={Link} href="/yonetim/duyuru" color="primary" variant="flat" className="m-1 min-w-min w-1/4 px-5">Duyuru Düzenle</Button>
            </div>

        </>
    )
}
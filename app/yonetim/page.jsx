import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { Button } from "@heroui/button";
import Link from "next/link";
import Styles from "./style.module.css";
export default async function Yonetim() {
    return (
        <>
            <TopNavbar title="Yönetim Sayfası" />
            <div className="w-full flex flex-col items-center justify-center mt-5">
                    <Button as={Link} href="/yonetim/kategoriler" color="primary" variant="flat" className="m-2 min-w-min w-1/4 px-5 font-bold">Kategorileri Düzenle</Button>
                    <Button as={Link} href="/yonetim/urunler" color="primary" variant="flat" className="m-2 min-w-min w-1/4 px-5 font-bold">Ürünleri Düzenle</Button>
                    <Button as={Link} href="/yonetim/duyuru" color="primary" variant="flat" className="m-2 min-w-min w-1/4 px-5 font-bold">Duyuru Düzenle</Button>
                    <Button as={Link} href="/yonetim/parolaDegistir" color="danger" variant="flat" className="m-2 min-w-min w-1/4 px-5 font-bold">Parolayı Değiştir</Button>
            </div>

        </>
    )
}
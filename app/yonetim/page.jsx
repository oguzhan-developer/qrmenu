import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { Button } from "@heroui/button";
import Link from "next/link";
export default function Yonetim() {
    return (
        <>
            <TopNavbar title="Yönetim Sayfası" />
            <div className="grid grid-cols-2 justify-center gap-4 max-w-fit m-auto max-h-fit mt-5 mx-auto ">
                <Link href="/yonetim/kategoriler">
                <Button size="lg" color="primary" variant="flat">Kategorileri Düzenle</Button>
                </Link>
                <Link href="/yonetim/urunler">
                <Button size="lg" color="primary" variant="flat">Ürünleri Düzenle</Button>
                </Link>
            </div>

        </>
    )
}
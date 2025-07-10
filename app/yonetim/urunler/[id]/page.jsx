import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import UrunlerCard from "./UrunlerCard";
import { getUrunler } from "@/lib/database";
import DenemeCard from "./DenemeCard";
export default async function Urunler({ params }) {
    const kolonlar = ["Sıra", "Başlık", "Açıklama", "Fiyat" , "Resim", "Aksiyonlar"]
    const { id } = await params;
    const urunler = await getUrunler(id)
    return (
        <>
            <TopNavbar title="Ürünler" pathname={`/yonetim/urunler/${id}`} />
            {/* <UrunlerCard kolonlar={kolonlar} urunler={urunler} /> */}
            <DenemeCard kolonlar={kolonlar} urunler={urunler} />
        </>

    )
}

import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { getUrunler, getKategori } from "@/lib/database";
import UrunlerCard from "./UrunlerCard";
import { p } from "framer-motion/client";

export default async function Urunler({ params }) {
    const kolonlar = ["Sıra", "Başlık", "Açıklama", "Fiyat", "Resim", "Aksiyonlar"]
    const { id } = await params;
    const kategori = await getKategori(id);
    const urunler = await getUrunler(id)
    console.log("ürünler", urunler);
    console.log(urunler.length);


    return (
        <>
            <TopNavbar title={kategori.isim} pathname={`/yonetim/urunler/${id}`} />
            {
                urunler.length === 0 ? (
                    <div className="mt-10 text-xl">Ürün Bulunamadı.</div>

                ): <UrunlerCard kolonlar = { kolonlar } urunler = { urunler } />

            }
        </>

    )
}

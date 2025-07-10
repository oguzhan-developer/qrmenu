import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";

import { getUrunler, getKategoriler } from "@/lib/database";
import KategorilerCard from "./KategorilerCard";
export default async function Urunler() {
    const kategoriler = await getKategoriler();
    // const urunler = await getUrunler();
    //Önce kategoriler gösterilmeli, seçilen kategoriye göre ürünler listelenmeli
    return (<>
        <TopNavbar title="Ürün Düzenleme" pathname="/yonetim/urunler" />
        <KategorilerCard kategoriler={kategoriler} /> 

    </>)
}
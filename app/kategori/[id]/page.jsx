import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx"
import Styles from "./style.module.css"
import UrunCard from "../../../components/UrunCard/UrunCard";
import { getUrunler, getKategori } from "@/lib/database";

export default async function UrunPage({ params }) {
    const { id } = await params;
    const kategori = await getKategori(id);
    const urunler = await getUrunler(id)
    console.log(urunler);
    console.log(kategori);

    const formatPrice = (price) => {
        const num = parseFloat(price);
        return num.toFixed(2).replace(".", ",")
    }
    return (
        <>
            <TopNavbar pathname={`/kategori/${id}`} title={kategori.isim} />
            <div className={`${Styles.container} justify-center m-auto mt-2`}>
                {
                    urunler.length == 0 ?
                        (
                            <p className="text-center mt-20 text-xl">{kategori.isim} Kategorisine ait ürün bulunamadı.</p>
                        ) : (
                            urunler.map((urun) => (<UrunCard key={urun.id} title={urun.baslik} image={urun.resim} price={formatPrice(urun.fiyat)} desc={urun.aciklama} />))
                        )
                }
            </div>
        </>
    )
}
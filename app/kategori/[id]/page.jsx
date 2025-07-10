import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx"
import Styles from "./style.module.css"
import UrunCard from "./UrunCard"
import { getUrunler, getKategori } from "@/lib/database";
import { formatPrice } from "@/lib/utils";
export default async function UrunPage({ params }) {
    const { id } = await params;
    const kategori = await getKategori(id);
    const urunler = await getUrunler(id)

    
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
import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx"
import Styles from "./style.module.css"
import UrunCard from "./UrunCard"
import { getUrunler, getKategori } from "@/lib/database";
import { formatPrice } from "@/lib/utils";
import { Card } from "@heroui/card";
import ImageElement from "../../../components/FormElements/ImageElement";
import { Button } from "@heroui/button";
export default async function UrunPage({ params }) {
    const { id } = await params;
    const kategori = await getKategori(id);
    const urunler = await getUrunler(id)


    return (
        <>
            <TopNavbar pathname={`/kategori/${id}`} title={kategori.isim} />

            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="space-y-4 mt-3 mb-4">
                    {urunler.map(urun => (
                        <Card key={urun.id} className="w-full max-w-none mx-auto p-4">
                            <div className="flex items-start gap-4 my-auto">
                                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                                    <ImageElement src={urun.resim} alt={urun.baslik} />
                                </div>

                                <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1 min-w-0 pr-2">
                                            <h3 className="font-semibold text-gray-900 text-lg sm:text-xl line-clamp-2 leading-tight">
                                                {urun.baslik}
                                            </h3>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="text-medium sm:text-l font-bold whitespace-nowrap leading-tight">
                                                {formatPrice(urun.fiyat)} ₺
                                            </span>
                                        </div>
                                    </div>

                                    {/* Orta kısım - Açıklama */}
                                    <div className="flex-1 mb-3">
                                        <p className="text-sm text-gray-700 line-clamp-2 ">
                                            {urun.aciklama &&   
                                                (urun.aciklama.length > 80 ?
                                                    urun.aciklama.slice(0, 80) + "..." :
                                                    urun.aciklama
                                                ) 
                                            }
                                        </p>
                                    </div>

                                    {/* Alt kısım - Kontroller
                                    <div className="flex items-center justify-between">
                                        

                                     
                                    </div> */}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* <div className={`${Styles.container} justify-center m-auto mt-2`}>
                {
                    urunler.length == 0 ?
                        (
                            <p className="text-center mt-20 text-xl">{kategori.isim} Kategorisine ait ürün bulunamadı.</p>
                        ) : (
                            urunler.map((urun) => (<UrunCard key={urun.id} title={urun.baslik} image={urun.resim} price={formatPrice(urun.fiyat)} desc={urun.aciklama} />))
                        )
                }
            </div> */}
        </>
    )
}
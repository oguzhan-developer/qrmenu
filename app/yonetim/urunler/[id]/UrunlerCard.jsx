"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { formatPrice } from "@/lib/utils";
import ImageElement from "@/components/FormElements/ImageElement";
export default function UrunlerCard({ urunler, onSiraDegistir }) {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    console.log(urunler);

    const handleSiraArti = async (urun) => {
        setLoading(true);
        const altindakiUrun = urunler.find(u => u.sira === urun.sira + 1)
        if (altindakiUrun) {
            await onSiraDegistir(urun.id, urun.sira + 1)
            await onSiraDegistir(altindakiUrun.id, urun.sira)
        }
        setLoading(false);
    }

    const handleSiraEksi = async (urun) => {
        setLoading(true);
        const ustundekiUrun = urunler.find(u => u.sira === urun.sira - 1)
        if (ustundekiUrun) {
            await onSiraDegistir(urun.id, urun.sira - 1)
            await onSiraDegistir(ustundekiUrun.id, urun.sira)
        }
        setLoading(false);
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 mt-3 mb-4">
                {urunler.map(urun => (
                    <Card key={urun.id} className="w-full max-w-none mx-auto p-4">
                        <div className="flex items-start gap-4 h-32"> {/* Sabit yükseklik */}
                            {/* Resim - Sabit boyut */}
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                                {/* <img
                                    src={`${urun.resim}`}
                                    alt={urun.baslik}
                                    className="w-full h-full object-cover rounded"
                                /> */}
                                <ImageElement src={urun.resim} alt={urun.baslik} />
                            </div>

                            {/* İçerik */}
                            <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                {/* Üst kısım - Başlık ve Fiyat */}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0 pr-2">
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight">
                                            {urun.baslik}
                                        </h3>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap">
                                            {formatPrice(urun.fiyat)}₺
                                        </span>
                                    </div>
                                </div>

                                {/* Orta kısım - Açıklama */}
                                <div className="flex-1 mb-3">
                                    <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                                        {urun.aciklama ?
                                            (urun.aciklama.length > 80 ?
                                                urun.aciklama.slice(0, 80) + "..." :
                                                urun.aciklama
                                            ) :
                                            <span className="text-gray-400">Açıklama bulunmuyor.</span>
                                        }
                                    </p>
                                </div>

                                {/* Alt kısım - Kontroller */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500 font-medium">
                                            Sıra: {urun.sira}
                                        </span>
                                        <div className="flex gap-1">
                                            <Button
                                                size="sm"
                                                isIconOnly
                                                variant="faded"
                                                isDisabled={(urun.sira === 1) || loading}
                                                onClick={() => handleSiraEksi(urun)}
                                                className="text-xs min-w-8 h-8"
                                            >
                                                ↑
                                            </Button>
                                            <Button
                                                size="sm"
                                                isIconOnly
                                                variant="faded"
                                                onClick={() => handleSiraArti(urun)}
                                                isDisabled={(urun.sira === urunler.length) || loading}
                                                className="text-xs min-w-8 h-8"
                                            >
                                                ↓
                                            </Button>
                                        </div>
                                    </div>

                                    <Button
                                        size="sm"
                                        color="primary"
                                        variant="flat"
                                        onClick={() => router.push(`?edit=${urun.id}`)}
                                        className="px-4"
                                    >
                                        Düzenle
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );

}
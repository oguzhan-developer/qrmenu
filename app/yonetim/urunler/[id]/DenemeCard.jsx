// UrunlerCard.jsx (responsive versiyon)
"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useRouter } from "next/navigation";
import React from "react";

export default function DenemeCard({ urunler, onSiraDegistir }) {
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
        <div className="space-y-4 mt-3">
            {urunler.map(urun => (
                <Card key={urun.id} className="p-4">
                    <div className="flex items-start gap-4">
                        <img
                            src={`/urunler/${urun.resim}.webp`}
                            alt={urun.baslik}
                            className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-gray-900 truncate">
                                    {urun.baslik}
                                </h3>
                                <span className="text-lg font-bold text-primary">
                                    {urun.fiyat}₺
                                </span>
                            </div>

                            <p className={`text-sm text-gray-600 ${urun.aciklama ? "pb-3": "pb-5"}`}>

                                {
                                    urun.aciklama && urun.aciklama.slice(0, 40) + "..."
                                }

                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Sıra: {urun.sira}</span>
                                    <div className="flex gap-1">
                                        <Button
                                            size="sm"
                                            isIconOnly
                                            variant="faded"
                                            isDisabled={(urun.sira === 1) || loading}
                                            onClick={() => handleSiraEksi(urun)}
                                            className="text-xs"
                                        >
                                            ↑
                                        </Button>
                                        <Button
                                            size="sm"
                                            isIconOnly
                                            variant="faded"
                                            onClick={() => handleSiraArti(urun)}
                                            isDisabled={(urun.sira === urunler.length) || loading}
                                            className="text-xs"
                                        >
                                            ↓
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    onClick={() => router.push(`/yonetim/urunler?edit=${urun.id}`)}
                                >
                                    Düzenle
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );

}
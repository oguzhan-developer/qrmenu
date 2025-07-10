"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useRouter } from 'next/navigation'
import React from "react";

export default function KategorilerTablosu({ kolonlar, kategoriler, onSiraDegistir }) {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSiraArti = async (kategori) => {
        setLoading(true);
        const altindakiKategori = kategoriler.find(k => k.sira === kategori.sira + 1)
        if (altindakiKategori) {
            await onSiraDegistir(kategori.id, kategori.sira + 1)
            await onSiraDegistir(altindakiKategori.id, kategori.sira)
            setLoading(false);
        }
    }

    const handleSiraEksi = async (kategori) => {
        setLoading(true);
        const ustundekiKategori = kategoriler.find(k => k.sira === kategori.sira - 1)
        if (ustundekiKategori) {
            await onSiraDegistir(kategori.id, kategori.sira - 1)
            await onSiraDegistir(ustundekiKategori.id, kategori.sira)
            setLoading(false);
        }
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 mt-3 mb-4">
                {kategoriler.map(kategori => (
                    <Card key={kategori.sira} className="w-full max-w-none mx-auto p-4">
                        <div className="flex items-start gap-4 h-32"> {/* Sabit yükseklik */}
                            {/* Resim - Sabit boyut */}
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                                <img
                                    src={`/kategoriler/${kategori.resim}.webp`}
                                    alt={kategori.isim}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>

                            {/* İçerik */}
                            <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                {/* Üst kısım - Başlık ve Fiyat */}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0 pr-2">
                                        <h3 className="font-semibold text-gray-900 text-xl sm:text-medium line-clamp-2 leading-tight">
                                            {kategori.isim}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500 font-medium">
                                            Sıra: {kategori.sira}
                                        </span>
                                        <div className="flex gap-1">
                                            <Button
                                                size="sm"
                                                isIconOnly
                                                variant="faded"
                                                isDisabled={(kategori.sira === 1) || loading}
                                                onClick={() => handleSiraEksi(kategori)}
                                                className="text-xs min-w-8 h-8"
                                            >
                                                ↑
                                            </Button>
                                            <Button
                                                size="sm"
                                                isIconOnly
                                                variant="faded"
                                                onClick={() => handleSiraArti(kategori)}
                                                isDisabled={(kategori.sira === kategoriler.length) || loading}
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
                                        onClick={() => router.push(`/yonetim/kategoriler?edit=${kategori.id}`)}
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
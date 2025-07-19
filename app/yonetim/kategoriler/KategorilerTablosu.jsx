"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useRouter } from 'next/navigation'
import React from "react";
import ImageElement from "@/components/FormElements/ImageElement";

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
                        <div className="flex items-start gap-4 h-32">
                            <div className="flex-shrink-0 w-24 h-24 my-auto">
                                <ImageElement src={kategori.resim} alt={kategori.isim} width={112} height={112} />
                            </div>

                            <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0 pr-1 mt-3">
                                        <h3 className="font-semibold text-gray-900 text-l sm:text-medium line-clamp-2 leading-tight">
                                            {kategori.isim}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                                <div className="flex flex-col items-center justify-between">
                                    <Button
                                        size="sm"
                                        color="primary"
                                        variant="flat"
                                        onClick={() => router.push(`/yonetim/kategoriler?edit=${kategori.id}`)}
                                        className="px-5 mb-2"
                                    >
                                        Düzenle
                                    </Button>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-sm text-gray-500 font-medium text-center">
                                            Sıra: {kategori.sira}
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
                                        </span>
                                    </div>

                                </div>

                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
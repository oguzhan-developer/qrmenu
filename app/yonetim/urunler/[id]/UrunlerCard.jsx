"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useRouter } from "next/navigation";
import React from "react";

export default function UrunlerCard({ kolonlar, urunler, onSiraDegistir }) {
    console.log(urunler);

    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSiraArti = async (kategori) => {
        setLoading(true);
        const altindakiKategori = veriler.find(k => k.sira === kategori.sira + 1)
        if (altindakiKategori) {
            await onSiraDegistir(kategori.id, kategori.sira + 1)
            await onSiraDegistir(altindakiKategori.id, kategori.sira)
            setLoading(false);
        }
    }

    const handleSiraEksi = async (kategori) => {
        setLoading(true);
        const ustundekiKategori = veriler.find(k => k.sira === kategori.sira - 1)
        if (ustundekiKategori) {
            await onSiraDegistir(kategori.id, kategori.sira - 1)
            await onSiraDegistir(ustundekiKategori.id, kategori.sira)
            setLoading(false);
        }
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                kolonlar.map(kolon => (
                                    <th key={kolon} scope="col" className="px-6 py-3">
                                        {kolon}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {urunler.map(urun => (
                            <tr key={urun.sira} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center self-center gap-2">
                                    <span>{urun.sira}</span>
                                    <div className="flex flex-col">
                                        <Button
                                            size="sm"
                                            isIconOnly
                                            variant="faded"
                                            isDisabled={(urun.sira === 1) || loading}
                                            onClick={() => handleSiraEksi(urun)}
                                            className="text-blue-600  text-xs disabled:text-gray-400 m-1"
                                        >
                                            ↑
                                        </Button>
                                        <Button
                                            size="sm"
                                            isIconOnly
                                            color="primary"
                                            variant="faded"
                                            onClick={() => handleSiraArti(urun)}
                                            isDisabled={(urun.sira === urun.length) || loading}
                                            className="text-blue-600 text-xs disabled:text-gray-400 m-1"
                                        >
                                            ↓
                                        </Button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {urun.baslik}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {urun.aciklama.slice(0,30)+ "..."}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {urun.fiyat}
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={`/urunler/${urun.resim}.webp`}
                                        alt={urun.baslik}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="flex items-center px-6 py-4">
                                    <button className="font-medium text-blue-600 hover:underline"
                                        onClick={() => {
                                            router.push(`/yonetim/urunler?edit=${urun.id}`)
                                        }}
                                    >
                                        Düzenle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

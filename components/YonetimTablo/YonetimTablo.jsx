"use client"
import { Button } from "@heroui/button";
import Styles from "./style.module.css"
import { useRouter } from 'next/navigation'
import React from "react";

export default function YonetimTablo({ kolonlar, veriler, onSiraDegistir }) {
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
                        {veriler.map(kategori => (
                            <tr key={kategori.sira} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center self-center gap-2">
                                    <span>{kategori.sira}</span>
                                    <div className="flex flex-col">
                                        <Button
                                            size="sm"
                                            isIconOnly
                                            variant="faded"
                                            isDisabled={(kategori.sira === 1) || loading}
                                            onClick={() => handleSiraEksi(kategori)}
                                            className="text-blue-600  text-xs disabled:text-gray-400 m-1"
                                        >
                                            ↑
                                        </Button>
                                        <Button
                                            size="sm"
                                            isIconOnly
                                            color="primary"
                                            variant="faded"
                                            onClick={() => handleSiraArti(kategori)}
                                            isDisabled={(kategori.sira === veriler.length) || loading}
                                            className="text-blue-600 text-xs disabled:text-gray-400 m-1"
                                        >
                                            ↓
                                        </Button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {kategori.isim}
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={`/kategoriler/${kategori.resim}.webp`}
                                        alt={kategori.isim}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="flex items-center px-6 py-4">
                                    <button className="font-medium text-blue-600 hover:underline"
                                        onClick={() => {
                                            router.push(`/yonetim/kategoriler?edit=${kategori.id}`)
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
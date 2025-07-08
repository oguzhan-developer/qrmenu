"use client"
import Styles from "./style.module.css"
export default function Tablo({ kolonlar, veriler, onSiraDegistir }) {

    const handleSiraArti = async (kategori) => {
        const altindakiKategori = veriler.find(k => k.sira === kategori.sira + 1)
        if (altindakiKategori) {
            await onSiraDegistir(kategori.id, kategori.sira + 1)
            await onSiraDegistir(altindakiKategori.id, kategori.sira)
        }
    }

    const handleSiraEksi = async (kategori) => {
        const ustundekiKategori = veriler.find(k => k.sira === kategori.sira - 1)
        if (ustundekiKategori) {
            await onSiraDegistir(kategori.id, kategori.sira - 1)
            await onSiraDegistir(ustundekiKategori.id, kategori.sira)
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
                            <th key="aksiyon" scope="col" className="px-6 py-3">
                                Aksiyonlar
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {veriler.map(kategori => (
                            <tr key={kategori.sira} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center self-center gap-2">
                                    <span>{kategori.sira}</span>
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => handleSiraEksi(kategori)}
                                            disabled={kategori.sira === 1}
                                            className="text-blue-600 hover:underline text-xs disabled:text-gray-400"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => handleSiraArti(kategori)}
                                            disabled={kategori.sira === veriler.length}
                                            className="text-blue-600 hover:underline text-xs disabled:text-gray-400"
                                        >
                                            ↓
                                        </button>
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
                                    <button className="font-medium text-blue-600 hover:underline">
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
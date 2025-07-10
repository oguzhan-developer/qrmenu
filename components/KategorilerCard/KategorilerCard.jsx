import { getKategoriler } from "@/lib/database";
import KategoriCard from "./KategoriCard"

export default async function Kategoriler() {
    const kategoriler = await getKategoriler();
    return (
        <>
            <div className="grid grid-cols-2 justify-center gap-4 max-w-fit mx-3 m-auto max-h-fit mt-5 select-none ">
                {
                    kategoriler.map((kategori) =>
                        (<KategoriCard key={kategori.id} id={kategori.id} title={kategori.isim} image={kategori.resim} />))
                }
            </div>
        </>
    )

}

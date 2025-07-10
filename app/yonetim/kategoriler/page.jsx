import TopNavbar from "@/components/TopNavbar/TopNavbar";
import KategoriDuzenleCard from "./KategoriDuzenleCard";

import { getKategoriler, updateKategoriSira } from "@/lib/database";
import { revalidatePath } from "next/cache";
import KategorilerTablosu from "./KategorilerTablosu";

export default async function Kategoriler({ searchParams }) {
    const kategoriler = await getKategoriler();
    const liste = ["Sıra", "İsim", "Resim", "Aksiyonlar"]
    const params = await searchParams;


    const editId = params?.edit;
    const editKategori = editId ? kategoriler.find(k => k.id == editId) : null;


    const handleSiraDegistir = async (id, yeniSira) => {
        "use server"
        await updateKategoriSira(id, yeniSira);
        revalidatePath("/yonetim/kategoriler")
    }

    if (editKategori) {
        return (
            <>
                <TopNavbar title={`Düzenle`} pathname="/yonetim/kategoriler" />
                <KategoriDuzenleCard item={editKategori} kategoriler={kategoriler} />
            </>
        )
    }

    return (
        <>
            <TopNavbar title="Kategoriler" pathname="/yonetim/kategoriler" />
            <KategorilerTablosu kolonlar={liste} kategoriler={kategoriler} onSiraDegistir={handleSiraDegistir} />
        </>
    )
}
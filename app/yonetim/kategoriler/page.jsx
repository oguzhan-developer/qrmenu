import TopNavbar from "@/components/TopNavbar/TopNavbar";
import DuzenleCard from "@/components/Kategoriler/DuzenleCard/DuzenleCard";

import { getKategoriler, updateKategoriSira } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { Link } from "@heroui/link";
import KategorilerTablosu from "./KategorilerTablosu";
import { Button } from "@heroui/button";

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
                <DuzenleCard item={editKategori} kategoriler={kategoriler} />
            </>
        )
    }

    return (
        <>
            <TopNavbar title="Kategoriler" pathname="/yonetim/kategoriler" />
            <Button as={Link} variant="faded" href="/yonetim/kategoriler/yeni" className="mt-3">Yeni Kategori Ekle</Button>
            <div className="flex flex-nowrap justify-center max-w-fit m-auto max-h-fit mt-3 mb-1 mx-auto ">
                <KategorilerTablosu kolonlar={liste} veriler={kategoriler} onSiraDegistir={handleSiraDegistir} />
            </div>
        </>
    )
}
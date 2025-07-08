import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { getKategoriler, updateKategoriSira } from "@/lib/database";
import Tablo from "../../../components/Tablo/Tablo";
import { revalidatePath } from "next/cache";
export default async function Kategoriler() {
    const kategoriler = await getKategoriler();
    const liste = ["Sıra", "İsim", "Resim"]
    console.log(kategoriler);

    const handleSiraDegistir = async (id, yeniSira) => {
        "use server"
        await updateKategoriSira(id, yeniSira);
        revalidatePath("/yonetim/kategoriler")
    }

    return (
        <>
            <TopNavbar title="Kategorileri Düzenle" />
            <div className="flex flex-nowrap justify-center max-w-fit m-auto max-h-fit mt-5 mx-auto ">
                <Tablo kolonlar={liste} veriler={kategoriler} onSiraDegistir={handleSiraDegistir} />
            </div>

        </>
    )
}
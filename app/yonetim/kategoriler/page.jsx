import TopNavbar from "@/components/TopNavbar/TopNavbar";
import KategoriDuzenleCard from "./KategoriDuzenleCard";
import { getKategoriler, updateKategoriSira, updateKategori, removeKategori } from "@/lib/database";
import { revalidatePath } from "next/cache";
import KategorilerTablosu from "./KategorilerTablosu";
import { formDataToUpdate } from "../../../lib/form-handler";

export default async function Kategoriler({ searchParams }) {
    const kategoriler = await getKategoriler();
    const liste = ["Sıra", "İsim", "Resim", "Aksiyonlar"]
    const params = await searchParams;


    const editId = params?.edit;
    const editKategori = editId ? kategoriler.find(k => k.id == editId) : null;

    const handleDeleteKategori = async (kategoriId) => {
        "use server"
        try {
            return await removeKategori(kategoriId);
        } catch (error) {
            console.error('Kategori silme hatası:', error);
            return { error: 'Kategori silinirken hata oluştu!' };
        }
    }


    const handleUpdateKategori = async (data) => {
        "use server"
        try {
            var updateData = {
                id: data.id,
                changeSira: false,
                isim: data.isim,
                mevcutResim: data.mevcutResim,
                yeniResim: data.yeniResim,
                sira: data.sira
            }
            if (data.oncekiSira === data.sira) {
                updateData.changeSira = false;
            } else {
                updateData.changeSira = true;
                updateData.oncekiSira = data.oncekiSira;
            }
            console.log("Kategori güncelleme verisi:", updateData);
            
            return await formDataToUpdate(updateData, updateKategori, "kategoriler")
        } catch (error) {
            console.error('Kategori güncelleme hatası:', error);
            return { error: 'Kategori güncellenirken hata oluştu!' };
        }
    }

    const handleSiraDegistir = async (id, yeniSira) => {
        "use server"
        await updateKategoriSira(id, yeniSira);
        revalidatePath("/yonetim/kategoriler")
    }

    if (editKategori) {
        return (
            <>
                <TopNavbar title={`Düzenle`} pathname="/yonetim/kategoriler" isYonetim />
                <KategoriDuzenleCard item={editKategori} kategoriler={kategoriler} handleUpdateKategori={handleUpdateKategori} handleDeleteKategori={handleDeleteKategori} />
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
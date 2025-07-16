import TopNavbar from "@/components/TopNavbar/TopNavbar";
import KategoriDuzenleCard from "./KategoriDuzenleCard";
import { getKategoriler, updateKategoriSira, updateKategori, removeKategori } from "@/lib/database";
import { saveProductImage, deleteProductImage } from "@/lib/fileUpload";
import { revalidatePath } from "next/cache";
import KategorilerTablosu from "./KategorilerTablosu";

export default async function Kategoriler({ searchParams }) {
    const kategoriler = await getKategoriler();
    const liste = ["Sıra", "İsim", "Resim", "Aksiyonlar"]
    const params = await searchParams;


    const editId = params?.edit;
    const editKategori = editId ? kategoriler.find(k => k.id == editId) : null;

    const handleDeleteKategori = async (kategoriId) => {
        "use server"
        try {
            const result = await removeKategori(kategoriId);
            return result

        } catch (error) {

        }

    }


    const handleUpdateKategori = async (data) => {
        
        "use server"
        try {
            console.log("data:",data);
            if (data.resimFile) {
                const uploadResult = await saveProductImage(data.resimFile, "kategoriler")
                if (uploadResult.error) {

                    setError("Resim yüklenirken hata oluştu.")
                    setLoading(false);
                    return;
                }
                data.resim = uploadResult.fileName;
            }


            var updateData = {}
            if (data.oncekiSira === data.sira) {
                updateData = {
                    changeSira: false,
                    isim: data.isim,
                    resim: data.resim,
                    sira: data.sira
                };
            } else {
                updateData = {
                    changeSira: true,
                    oncekiSira: data.oncekiSira,
                    isim: data.isim,
                    resim: data.resim,
                    sira: data.sira
                }
            }
            const result = await updateKategori(data.id, updateData);
            if (result.error) {
                await deleteProductImage(data.resim, "kategoriler");
                return { error: 'Kategori veritabanına kaydedilemedi' };
            }
            return result;

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
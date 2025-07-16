import TopNavbar from "@/components/TopNavbar/TopNavbar";
import KategoriEkleCard from "./KategoriEkleCard"
import { createKategori } from "@/lib/database";
import { saveProductImage, deleteProductImage } from "@/lib/fileUpload";
export default function YeniKategori() {

    const handleCreate = async (data) => {
        "use server"
        const { fileName, error: fileError } = await saveProductImage(data.resim, "kategoriler");
        if (fileError) {
            return { error: fileError };
        }
        data.resim = fileName
        const result = await createKategori(data);
        if (result.error) {
            await deleteProductImage(fileName);
            return { error: 'Ürün veritabanına kaydedilemedi' };
        }
        return result;
    }

    return (
        <>
            <TopNavbar title="Yeni Kategori Oluştur" pathname="/yonetim/kategoriler/olustur" />
            <div className="mx-auto mt-5">
                <KategoriEkleCard handleCreate={handleCreate}/>
            </div>
        </>
    )
}
import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { updateUrun, getUrunler, getKategori, getKategoriler } from "@/lib/database";
import { saveProductImage, deleteProductImage } from "@/lib/fileUpload";
import UrunlerCard from "./UrunlerCard";
import UrunDuzenleCard from "./UrunDuzenleCard";
import { formDataToObject } from "@/lib/utils";

export default async function Urunler({ params, searchParams }) {

    const { id } = await params;
    if (isNaN(parseInt(id))) {
        return <div>Geçersiz Kategori ID</div>;
    }
    const sParams = await searchParams;
    const kategoriler = await getKategoriler();
    const kategori = await getKategori(id);
    const urunler = await getUrunler(id)


    const handleUpdateUrun = async (formData) => {
        "use server"
        try {
            var data = formDataToObject(formData)

            if (data.yeniResim && data.yeniResim.size > 0) {
                const { fileName, error: uploadError } = await saveProductImage(data.yeniResim, "urunler")
                if (uploadError) {
                    return { error: `Resim yüklenemedi: ${uploadError}` };
                }
                data.resim = fileName;
                delete data.yeniResim;
                if (data.mevcutResim) {
                    await deleteProductImage(data.mevcutResim, "urunler");
                    delete data.mevcutResim;
                }
            }


            const { error: dbError } = await updateUrun(data.id, data);
            if (dbError) {
                if (data.resim) {
                    await deleteProductImage(data.resim, "urunler");
                }
                return { error: `Veritabanı hatası: ${dbError.message}` };
            }
            return { success: true };

        } catch (error) {
            console.error('handleUpdateUrun Hata:', error);
            return { error: 'Ürün güncellenirken hata oluştu!' };
        }
    }


    const editId = sParams?.edit;
    if (editId) {
        const urun = urunler.find(u => u.id.toString() === editId)
        if (urun) {
            return (
                <>
                    <TopNavbar title={`${urun.baslik} - Düzenle`} pathname={`/yonetim/urunler/${id}`} isYonetim />
                    <UrunDuzenleCard kategoriler={kategoriler} urunler={urunler} urun={urun} handleUpdateUrun={handleUpdateUrun} /></>
            )
        }
    }

    return (
        <>
            <TopNavbar title={kategori.isim} pathname={`/yonetim/urunler/${id}`} isYonetim />
            {
                urunler.length === 0 ? (
                    <div className="mt-10 text-xl">Ürün Bulunamadı.</div>

                ) : <UrunlerCard urunler={urunler} />

            }
        </>

    )
}

import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { updateUrun, updateUrunSira, getUrunler, getKategori, getKategoriler } from "@/lib/database";
import UrunlerCard from "./UrunlerCard";
import UrunDuzenleCard from "./UrunDuzenleCard";
import { formDataToUpdate } from "@/lib/form-handler";
import { revalidatePath } from "next/cache";
export default async function Urunler({ params, searchParams }) {

    const { id } = await params;
    if (isNaN(parseInt(id))) {
        return <div>Geçersiz Kategori ID</div>;
    }
    const sParams = await searchParams;
    const kategoriler = await getKategoriler();
    const kategori = await getKategori(id);
    const urunler = await getUrunler(id)


    const onSiraDegistir = async (id, yeniSira) => {
            "use server"
            await updateUrunSira(id, yeniSira);
            revalidatePath("/yonetim/urunler")
        }

    const handleUpdateUrun = async (formData) => {
        "use server"
        return await formDataToUpdate(formData, updateUrun, "urunler")
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

                ) : <UrunlerCard urunler={urunler} onSiraDegistir={onSiraDegistir} />

            }
        </>

    )
}

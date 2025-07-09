import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { getDuyuru, updateDuyuru } from "@/lib/database";
import BannerDuzenle from "@/components/Banner/BannerDuzenle";
import { revalidatePath } from "next/cache";
export default async function Duyuru() {
    const duyuru = await getDuyuru();

    const duyuruSubmit = async (duyuruData) => {
        "use server"
        const result = await updateDuyuru(duyuruData);
        if(result.error) {
            console.error('Duyuru Düzenleme hatası:', result.error);
            return { error: result.error };
        }
        revalidatePath("/yonetim/duyuru");
        return { success: true };
    }

    return (<>
        <TopNavbar title="Duyuru Düzenle" pathname="/yonetim/duyuru" />
        <BannerDuzenle duyuru={duyuru} duyuruSubmit={duyuruSubmit} />
    </>)
}
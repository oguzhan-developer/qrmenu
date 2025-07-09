import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import ParolaCard from "./ParolaCard";
import { updateParola } from "@/lib/database";
export default async function ParolaDegistir() {

    const handleSubmit = async (yeniParola) => {
        "use server"
        try {
            const result = await updateParola(yeniParola);

            if (result.error) {
                return { error: 'Parola güncellenirken hata oluştu' };
            }

            return { success: true };

        } catch (error) {
            console.error('Parola değiştirme hatası:', error);
            return { error: 'Beklenmeyen bir hata oluştu' };
        }

    }

    return (<>
        <TopNavbar title="Parola Değiştir" />
        <ParolaCard handleSubmit={handleSubmit} />
    </>)
}
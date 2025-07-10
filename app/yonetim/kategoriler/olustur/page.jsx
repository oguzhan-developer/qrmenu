import TopNavbar from "@/components/TopNavbar/TopNavbar";
import KategoriEkleCard from "./KategoriEkleCard"

export default function YeniKategori() {

    return (
        <>
            <TopNavbar title="Yeni Kategori Oluştur" pathname="/yonetim/kategoriler/olustur" />
            <div className="mx-auto mt-5">
                <KategoriEkleCard />
            </div>
        </>
    )
}
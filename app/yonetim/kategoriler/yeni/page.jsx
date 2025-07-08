import TopNavbar from "@/components/TopNavbar/TopNavbar";
import KategoriEkle from "@/components/Kategoriler/EkleCard/KategoriEkle";

export default function YeniKategori() {

    return (
        <>
            <TopNavbar title="Yeni Kategori Ekle" pathname="/yonetim/kategoriler/yeni" />
            <div className="mx-auto mt-5">
                <KategoriEkle />
            </div>
        </>
    )
}
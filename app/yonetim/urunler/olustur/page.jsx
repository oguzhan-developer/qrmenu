import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import UrunOlusturCard from "./UrunOlusturCard";
import { getKategoriler, createUrun } from "@/lib/database";
export default async function UrunOlusturPage() {
  const kategoriler = await getKategoriler();
  
  const handleCreate = async (data) => {
    "use server"
    const result = await createUrun(data);
    return result;
  }

  return (
    <>
      <TopNavbar title="Ürün Oluştur" pathname="/yonetim/urunler/olustur" />
      <UrunOlusturCard kategoriler={kategoriler} handleCreate={handleCreate}/>
    </>
  )
}

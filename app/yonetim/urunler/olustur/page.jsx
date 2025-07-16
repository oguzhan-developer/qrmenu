import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import UrunOlusturCard from "./UrunOlusturCard";
import { getKategoriler, createUrun } from "@/lib/database";
import { saveProductImage, deleteProductImage } from "@/lib/fileUpload";
export default async function UrunOlusturPage() {
  const kategoriler = await getKategoriler();

  const handleCreate = async (data) => {
    "use server"
    const { fileName, error: fileError } = await saveProductImage(data.resim, "urunler");
    if (fileError) {
      return { error: fileError };
    }
    data.resim = fileName
    const result = await createUrun(data);
    if (result.error) {
      await deleteProductImage(fileName, "urunler");
      return { error: 'Ürün veritabanına kaydedilemedi' };
    }
    return result;
  }

  return (
    <>
      <TopNavbar title="Ürün Oluştur" pathname="/yonetim/urunler/olustur" isYonetim />
      <UrunOlusturCard kategoriler={kategoriler} handleCreate={handleCreate} />
    </>
  )
}

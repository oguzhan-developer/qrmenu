"use server"
import { saveProductImage, deleteProductImage } from "@/lib/fileUpload";
export const formDataToUpdate = async (data, updateDBFunc, imagePath) => {
  try {

    if (data.yeniResim && data.yeniResim.size > 0) {
      const { fileName, error: uploadError } = await saveProductImage(
        data.yeniResim,
        imagePath
      );
      if (uploadError) {
        return { error: `Resim yüklenemedi: ${uploadError}` };
      }
      data.resim = fileName;
      delete data.yeniResim;
      if (data.mevcutResim) {
        await deleteProductImage(data.mevcutResim, imagePath);
        delete data.mevcutResim;
      }
    }

    const { error: dbError } = await updateDBFunc(data.id, data);
    if (dbError) {
      if (data.resim) {
        await deleteProductImage(data.resim, imagePath);
      }
      return { error: `Veritabanı hatası: ${dbError.message}` };
    }
    return { success: true };
  } catch (error) {
    console.error("Form Handler hata verdi: ", error);
    return { error: "Ürün güncellenirken hata oluştu!" };
  }
};

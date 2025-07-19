import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { settings } from "@/config/settings";
const BUNNY_STORAGE_PULL_HOSTNAME = process.env.BUNNY_STORAGE_PULL_HOSTNAME;
const BUNNY_STORAGE_ZONE_NAME = process.env.BUNNY_STORAGE_ZONE_NAME;
const BUNNY_STORAGE_ZONE_HOSTNAME = process.env.BUNNY_STORAGE_ZONE_HOSTNAME;
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;

export async function saveProductImage(file, klasorName) {
  try {
    if (!file || file.size === 0) {
      return { fileName: null, error: "Yüklenecek dosya bulunamadı." };
    }

    // Dosya tipi kontrolü
    const allowedTypes = settings.imageUpload.allowedTypes;
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Desteklenmeyen dosya tipi. Sadece JPG, PNG ve WebP dosyaları kabul edilir."
      );
    }

    // Dosya boyutu kontrolü (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("Dosya boyutu çok büyük. Maksimum 5MB olabilir.");
    }

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = path.extname(file.name);
    const fileName = `urun_${timestamp}_${randomStr}${extension}`;

    const uploadPath = `${klasorName}/${fileName}`;
    const uploadUrl = `https://${BUNNY_STORAGE_ZONE_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/${uploadPath}`;

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_API_KEY,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Bunny CDN yükleme hatası:", errorText);
      if (response.status === 401) {
        return {
          fileName: null,
          error:
            "Bunny CDN yetkilendirme hatası. API anahtarınızı kontrol edin.",
        };
      }
      return {
        fileName: null,
        error: `Dosya yüklenemedi: ${response.statusText}`,
      };
    }
    const filePath = `${BUNNY_STORAGE_PULL_HOSTNAME}/${uploadPath}`;

    // // Dosyayı buffer'a çevir
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // // Kaydetme yolu
    // const uploadDir = path.join(process.cwd(), "public", klasorName);

    // // Dizin yoksa oluştur
    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }

    // const filePath = path.join(uploadDir, fileName);

    // // Dosyayı kaydet
    // fs.writeFileSync(filePath, buffer);

    return { fileName: uploadPath, error: null };
  } catch (error) {
    console.error("saveProductImage içinde beklenmedik hata:", error);
    return { fileName: null, error: error.message };
  }
}
//Deleteproduct image düzenlenecek
export async function deleteProductImage(filePath) {
  if (!filePath) return;

  try {
    const deleteUrl = `https://${BUNNY_STORAGE_ZONE_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/${filePath}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        AccessKey: BUNNY_API_KEY,
      },
    });

    // Dosya zaten yoksa (404), bu bir hata değildir, o yüzden görmezden gel.
    if (!response.ok && response.status !== 404) {
      const errorText = await response.text();
      console.error("Bunny CDN silme hatası:", errorText);
    }

    return { success: "Dosya başarıyla silindi." };

  } catch (err) {
    console.error("deleteProductImage içinde beklenmedik hata:", err);
  }
}

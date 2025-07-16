import bcrypt from "bcryptjs";

//Parola şifreleme fonksiyonu
export async function parolaEncrypt(password) {
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Parola şifrelenirken hata:", error);
    throw new Error("Parola şifreleme hatası");
  }
}

export async function parolaDogrula(password, hashedPassword) {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error("Parola doğrulanırken hata:", error);
    return false;
  }
}

export const formatPrice = (price) => {
  const num = parseFloat(price);
  return num.toFixed(2).replace(".", ",");
};

// ...existing code...
/**
 * Objeyi FormData'ya çevirir. Dosyaları ve diğer veri tiplerini doğru şekilde işler.
 * @param {Object} obj - FormData'ya dönüştürülecek obje.
 * @returns {FormData}
 */
export function objectToFormData(obj) {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
}

/**
 * FormData'yı, tipleri otomatik olarak dönüştürerek bir JavaScript objesine çevirir.
 * @param {FormData} formData - Objeye dönüştürülecek FormData.
 * @returns {Object}
 */
export const formDataToObject = (formData) => {
  if (!formData || typeof formData.entries !== 'function') {
    console.error("formDataToObject uyarı: Geçerli bir FormData nesnesi gönderilmedi.");
    return {};
  }

  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      // Dosya objesini olduğu gibi bırak
      obj[key] = value;
    } else if (typeof value === 'string') {
      // String değerleri mantıksal tiplerine dönüştür
      if (value === 'true') {
        obj[key] = true;
      } else if (value === 'false') {
        obj[key] = false;
      } else if (!isNaN(value) && !isNaN(parseFloat(value)) && value.trim() !== '') {
        // Sayısal değerleri number tipine çevir
        obj[key] = Number(value);
      } else {
        obj[key] = value;
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
};
// ...existing code...
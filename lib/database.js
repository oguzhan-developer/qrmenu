import { supabase } from "./supabase";
import { parolaEncrypt, parolaDogrula } from "@/lib/utils";

export async function updateParola(yeniParola) {
    try {
        const hashedPassword = await parolaEncrypt(yeniParola);

        const { data, error } = await supabase
            .from("yonetim")
            .update({ parola: hashedPassword })
            .eq("id", 1)
            .select()
            .single();

        if (error) {
            console.error("Parola güncellenirken hata:", error);
            return { data: null, error };
        }

        console.log("Parola başarıyla güncellendi");
        return { data, error: null };

    } catch (error) {
        console.error("updateParola genel hata:", error);
        return { data: null, error };
    }
}

export async function controlParola(mevcutParola) {
    try {
        const { data, error } = await supabase
            .from("yonetim")
            .select("parola")
            .eq("id", 1)
            .single();

        if (error) {
            console.error("Mevcut parola kontrol edilirken hata:", error);
            return { isValid: false, error };
        }

        const isValid = await parolaDogrula(mevcutParola, data.parola);

        return { isValid, error: null };

    } catch (error) {
        console.error("Parola Kontrol Sırasında hata:", error);
        return { isValid: false, error };
    }
}


export async function updateDuyuru(newData) {
  const { data, error } = await supabase
    .from("yonetim")
   .update(newData)
   .eq("id",1)
   .select()
    .single();

  if (error) {
    console.error("Duyuru Güncellenirken hata oluştu:", error);
    return { data: null, error };
  }
  console.log("Duyuru Güncellendi", data);

  return {data, error: null};
}

export async function getDuyuru() {
  const { data, error } = await supabase
    .from("yonetim")
    .select("isDuyuruAktif, duyuruMesaj")
    .single();

  if (error) {
    console.error("Duyuru Aktiflik durumu çekilirken hata oluştu:", error);
    return { data: null, error };
  }
  return data;
}

export async function updateKategoriSira(id, yeniSira) {

  const { data, error } = await supabase
    .from("kategoriler")
    .update({ sira: yeniSira })
    .eq("id", id);

  if (error) {
    console.error("Kategori sırası güncellenirken hata:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateKategori(id, kategoriData) {
  const { changeSira, oncekiSira, ...updateData } = kategoriData;

  if (changeSira) {
    const { data: sirayaSahipKategori } = await supabase
      .from("kategoriler")
      .select("id, sira")
      .eq("sira", updateData.sira)
      .neq("id", id)
      .single();

    if (sirayaSahipKategori) {
      updateKategoriSira(sirayaSahipKategori.id, oncekiSira);
    }
  }

  const { data, error } = await supabase
    .from("kategoriler")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Kategori güncellenirken hata:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function removeKategori(id) {
  try {
    // Önce bu kategoriye ait ürünleri kontrol et
    const { data: urunler, error: urunlerError } = await supabase
      .from("urunler")
      .select("id")
      .eq("kategori_id", id);

    if (urunlerError) {
      console.error("Ürünler kontrol edilirken hata:", urunlerError);
      return { data: null, error: urunlerError };
    }

    // Eğer bu kategoriye ait ürünler varsa silinmeye izin verme
    if (urunler && urunler.length > 0) {
      const error = {
        message: "Bu kategoriye ait ürünler mevcut. Önce ürünleri silin.",
        code: "CATEGORY_HAS_PRODUCTS",
      };
      return { data: null, error };
    }

    const { data, error } = await supabase
      .from("kategoriler")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Kategori silinirken hata:", error);
      return { data: null, error };
    }

    console.log("Kategori başarıyla silindi:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Kategori silinirken hata oluştu:", error);
    return { data: null, error };
  }
}

export async function createKategori(kategoriData) {
  try {
    const { data: maxSiraData } = await supabase
      .from("kategoriler")
      .select("sira")
      .order("sira", { ascending: false })
      .limit(1)
      .single();

    const yeniSira = maxSiraData ? maxSiraData.sira + 1 : 1;

    // Yeni kategori verisi
    const yeniKategori = {
      isim: kategoriData.isim,
      resim: kategoriData.resim,
      sira: yeniSira,
    };
    const { data, error } = await supabase
      .from("kategoriler")
      .insert(yeniKategori)
      .select()
      .single();

    if (error) {
      console.error("Kategori oluşturulurken hata:", error);
      return { data: null, error };
    }

    console.log("Yeni kategori oluşturuldu:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Kategori oluşturulurken hata:", error);
    return { data: null, error };
  }
}

export async function getKategori(id) {
  const { data, error } = await supabase
    .from("kategoriler")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Hata:", error);
    return [];
  }

  return data;
}

export async function getKategoriler() {
  const { data, error } = await supabase
    .from("kategoriler")
    .select("*")
    .order("sira", { ascending: true });

  if (error) {
    console.error("Kategoriler çekilirken hata oluştu:", error);
    return [];
  }

  return data;
}

export async function getUrunler(kategori) {
  const { data, error } = await supabase
    .from("urunler")
    .select(
      `
            *,
            kategoriler (
                isim
            )
        `
    )
    .eq("kategori_id", kategori)
    .order("sira", { ascending: true });

  if (error) {
    console.error("Ürünler çekilirken hata oluştu:", error);
    return [];
  }

  return data;
}

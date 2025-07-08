import { supabase } from "./supabase";

export async function updateKategoriSira(id, yeniSira) {
  console.log("UpdateKategori id:",id, " Yeni Sıra:", yeniSira);
  
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

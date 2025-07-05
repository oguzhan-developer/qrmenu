import { supabase } from "./supabase";

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
    .order("id", { ascending: true });

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
    .order("id", { ascending: true });

  if (error) {
    console.error("Ürünler çekilirken hata oluştu:", error);
    return [];
  }

  return data;
}

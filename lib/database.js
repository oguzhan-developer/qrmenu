import { supabase } from './supabase'

// Kategorileri 
export async function getKategoriler() {
    const { data, error } = await supabase
        .from('kategoriler')
        .select('*')
        .order('id', { ascending: true })
    
    if (error) {
        console.error('Hata:', error)
        return []
    }
    
    return data
}

export async function getUrunler(kategori) {
    const { data, error } = await supabase
        .from('urunler')
        .select(`
            *,
            kategoriler (
                isim
            )
        `)
        .eq('kategoriler.isim', kategori)
        .order('id', { ascending: true })
    
    if (error) {
        console.error('Hata:', error)
        return []
    }
    
    return data
}
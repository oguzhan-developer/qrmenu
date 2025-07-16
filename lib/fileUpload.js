import fs from 'fs';
import path from 'path';

export async function saveProductImage(file, klasorName) {
    try {
        // Dosya tipi kontrolü
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Desteklenmeyen dosya tipi. Sadece JPG, PNG ve WebP dosyaları kabul edilir.');
        }

        // Dosya boyutu kontrolü (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error('Dosya boyutu çok büyük. Maksimum 5MB olabilir.');
        }

        // Benzersiz dosya adı oluştur
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const extension = path.extname(file.name);
        const fileName = `urun_${timestamp}_${randomStr}${extension}`;

        // Dosyayı buffer'a çevir
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Kaydetme yolu
        const uploadDir = path.join(process.cwd(), 'public', klasorName);
        
        // Dizin yoksa oluştur
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);

        // Dosyayı kaydet
        fs.writeFileSync(filePath, buffer);

        return { fileName, error: null };

    } catch (error) {
        console.error('Dosya yükleme hatası:', error);
        return { fileName: null, error: error.message };
    }
}

export async function deleteProductImage(fileName, klasorName) {
    try {
        const filePath = path.join(process.cwd(), 'public', klasorName, fileName);
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return { success: true, error: null };
        }
        
        return { success: true, error: null }; // Dosya zaten yoksa sorun yok
        
    } catch (error) {
        console.error('Dosya silme hatası:', error);
        return { success: false, error: error.message };
    }
}
"use client"
import { settings } from "@/config/settings";

export default function ImageInput({ resimPreview, mevcutResimUrl, setResimFile, setResimPreview, setError }) {

    const handleFileChange = async (e) => {
        var file = e.target.files[0];
        if (!file) return;
        const allowedTypes = settings.imageUpload.allowedTypes;
        if (!allowedTypes.includes(file.type)) {
            setError('Desteklenmeyen dosya tipi. Sadece JPG, PNG ve WebP dosyaları kabul edilir.');
            return;
        }

        // HEIC/HEIF formatı için dönüşüm
        if (file.type === "image/heic" || file.type === "image/heif") {
            setError("iPhone fotoğrafı dönüştürülüyor, lütfen bekleyin...");
            setResimFile(null);
            setResimPreview(null);

            try {
                const heic2anyModule = await import('heic2any');
                const heic2any = heic2anyModule.default; // Genellikle default export kullanılır

                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.8, // Kaliteyi ayarlayabilirsiniz
                });

                // Blob'u tekrar File objesine çeviriyoruz
                const fileName = file.name.split('.')[0] + '.jpeg';
                file = new File([convertedBlob], fileName, {
                    type: "image/jpeg",
                    lastModified: new Date().getTime(),
                });

            } catch (err) {
                console.error("HEIC dönüşüm hatası:", err);
                setError("Fotoğraf dönüştürülürken bir hata oluştu.");
                return;
            }
        }


        if (file.size > settings.imageUpload.maxSize) {
            setError('Dosya boyutu çok büyük.');
            return;
        }

        setError("");
        setResimFile(file);

        // Preview oluştur
        const reader = new FileReader();
        reader.onload = (e) => setResimPreview(e.target.result);

        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Resim yüklemek için tıkla</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 px-3">Maksimum 10MB</p>
                    </div>
                    <input id='dropzone-file' type="file"
                        name="inputFile"
                        accept={settings.imageUpload.allowedTypes.join(",")}
                        // accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            </div>
            {(resimPreview || mevcutResimUrl) && (
                <div className="mx-auto">
                    <img
                        src={resimPreview || mevcutResimUrl}
                        alt="Ürün Resmi"
                        className="w-24 h-24 object-cover rounded border"
                    />
                    <p className='text-center text-xs mt-1 text-gray-400'>Önizleme</p>
                </div>
            )}
        </>
    )
}

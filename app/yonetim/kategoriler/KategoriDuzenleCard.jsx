"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { useRouter } from "next/navigation";
import ImageInput from '@/components/ImageInput/ImageInput';

export default function KategoriDuzenleCard({ item, kategoriler, handleUpdateKategori, handleDeleteKategori }) {
    const [isim, setIsim] = React.useState(item.isim || "");
    const [resimFile, setResimFile] = React.useState(null);
    const [resimPreview, setResimPreview] = React.useState(item.resim || null);

    const [sira, setSira] = React.useState(item.sira.toString() || "");
    const [loading, setLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const router = useRouter();
    const siralar = kategoriler
        .map(kategori => kategori.sira)
        .sort((a, b) => a - b);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            var newData = {
                id: item.id,
                isim, resim: resimPreview, resimFile, sira: parseInt(sira), oncekiSira: item.sira,

            }
            const result = await handleUpdateKategori(newData);

            if (result.error) {
                console.error('Güncelleme hatası:', result.error);
                setError("Kategori güncellenirken hata oluştu.");
            } else {
                setError(false);
                setSuccess(true);
                setTimeout(() => {
                    router.push('/yonetim/kategoriler');
                }, 500)
            }
        } catch (error) {
            console.error('Hata:', error);
            setError("Güncelleme sırasında hata oluştu!");
        } finally {
            setLoading(false);
        }
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Dosya tipi kontrolü
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setError('Desteklenmeyen dosya tipi. Sadece JPG, PNG ve WebP dosyaları kabul edilir.');
                return;
            }

            // Dosya boyutu kontrolü (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Dosya boyutu çok büyük. Maksimum 5MB olabilir.');
                return;
            }

            setResimFile(file);
            setError("");

            // Preview oluştur
            const reader = new FileReader();
            reader.onload = (e) => {
                setResimPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleDelete = async () => {
        const confirmed = window.confirm(`"${item.isim}" kategorisini silmek istediğinizden emin misiniz?`);

        if (!confirmed) return;

        setDeleteLoading(true);
        setError(false);

        try {
            const result = await handleDeleteKategori(item.id);

            if (result.error) {
                console.error('Silme hatası:', result.error);

                if (result.error.code === 'CATEGORY_HAS_PRODUCTS') {
                    setError('Bu kategoriye ait ürünler mevcut. Önce ürünleri silin.');
                } else {
                    setError('Silme sırasında hata oluştu!');
                }
            } else {
                setSuccess('Kategori başarıyla silindi!');
                router.push('/yonetim/kategoriler');
            }
        } catch (error) {
            console.error('Hata:', error);
            setError(true);
            alert('Silme sırasında hata oluştu!');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <Card className="w-full">
                <Form
                    className="w-full justify-center items-center space-y-4 p-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-4 ">
                        <Input
                            isRequired
                            label="İsim"
                            labelPlacement="outside"
                            name="isim"
                            type="text"
                            value={isim}
                            onValueChange={setIsim}
                        />

                        <ImageInput onChange={handleFileChange} />
                    
                        {resimPreview && (
                            <div className="mx-auto">
                                <img
                                    src={resimFile ? resimPreview : `/kategoriler/${resimPreview}`}
                                    alt="Önizleme"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                                <p className='text-center text-xs mt-1 text-gray-400'>Önizleme</p>
                            </div>
                        )}

                        <Select
                            isRequired
                            label="Sıra"
                            labelPlacement="outside"
                            name="sira"
                            value={item.sira.toString()}
                            selectedKeys={new Set([sira])}
                            onSelectionChange={(keys) => setSira(Array.from(keys)[0])}
                        >
                            {siralar.map((siraNo) => (
                                <SelectItem key={siraNo.toString()} textValue={siraNo.toString()}>
                                    {siraNo}
                                </SelectItem>
                            ))}
                        </Select>

                        {error && <span className="text-danger text-small">Hata Oluştu. {error}</span>}

                        <div className="flex gap-4 items-center">
                            <Button className="w-3/4" color="primary" type="submit" spinnerPlacement="end" isLoading={loading} size="sm">
                                Kaydet
                            </Button>
                            <Button size="sm" onPress={handleDelete} isLoading={deleteLoading} isDisabled={loading || deleteLoading} className="w-1/4" color="danger" variant="bordered">
                                Sil
                            </Button>
                        </div>
                    </div>

                    {/* {submitted && (
                        <div className="text-small text-default-500 mt-4">
                            Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
                        </div>
                    )} */}
                </Form>

            </Card>
        </div>
    )
}
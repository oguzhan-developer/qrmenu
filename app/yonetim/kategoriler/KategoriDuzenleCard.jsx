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
    // Resim için ayrı ve temiz state'ler
    const [resimFile, setResimFile] = React.useState(null); // Sadece yeni seçilen File objesi
    const [resimPreview, setResimPreview] = React.useState(null); // Sadece yeni seçilen resmin data URL'i
    const [mevcutResimUrl] = React.useState(item.resim || null); // Mevcut resmin URL'i, sabit

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

        console.log("Resim flie", resimFile);

        try {
            var newData = {
                id: item.id,
                isim, sira: parseInt(sira), oncekiSira: item.sira,

            }
            if (resimFile) {
                newData.yeniResim = resimFile;
                newData.mevcutResim = item.resim;
            }
            console.log("Güncelleme verisi:", newData);

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
                    setError('Bu kategoriye ait ürünler mevcut, önce ürünleri silin!');
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

                        <ImageInput resimPreview={resimPreview} mevcutResimUrl={mevcutResimUrl} setResimFile={setResimFile} setResimPreview={setResimPreview} setError={setError} />

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

                        {error && <span className="text-danger text-small">{error}</span>}

                        <div className="flex gap-4 items-center">
                            <Button className="w-3/4" color="primary" type="submit" spinnerPlacement="end" isLoading={loading} size="sm">
                                Kaydet
                            </Button>
                            <Button size="sm" onPress={handleDelete} isLoading={deleteLoading} isDisabled={loading || deleteLoading} className="w-1/4" color="danger" variant="bordered">
                                Sil
                            </Button>
                        </div>
                    </div>

                </Form>

            </Card>
        </div>
    )
}
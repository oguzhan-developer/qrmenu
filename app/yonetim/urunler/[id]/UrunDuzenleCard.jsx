"use client"
import { useRouter } from "next/navigation";
import ImageInput from '@/components/ImageInput/ImageInput';
import React from "react";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { NumberInput } from "@heroui/number-input";

export default function UrunDuzenleCard({ kategoriler, urunler, urun, handleUpdateUrun, handleDeleteUrun }) {
    const [baslik, setBaslik] = React.useState(urun.baslik || "");
    const [aciklama, setAciklama] = React.useState(urun.aciklama || "");
    const [fiyat, setFiyat] = React.useState(parseFloat(urun.fiyat?.toString().replace(",", ".")) || "0");
    const [secilenKategori, setSecilenKategori] = React.useState(urun.kategori_id.toString() || "");

    // Resim için ayrı ve temiz state'ler
    const [resimFile, setResimFile] = React.useState(null); // Sadece yeni seçilen File objesi
    const [resimPreview, setResimPreview] = React.useState(null); // Sadece yeni seçilen resmin data URL'i
    const [mevcutResimUrl] = React.useState(urun.resim ? `/urunler/${urun.resim}` : null); // Mevcut resmin URL'i, sabit

    const [loading, setLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const newData = {
                id: urun.id,
                baslik, aciklama, fiyat, kategori_id: secilenKategori
            }

            if (resimFile) {
                newData.yeniResim = resimFile;
                newData.mevcutResim = urun.resim;
            }

            const result = await handleUpdateUrun(newData);
            if (result?.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push(`/yonetim/urunler/${secilenKategori}`);
                }, 600)
            }

        } catch (err) {
            setError("Güncelleme sırasında hata oluştu!");
            console.error(err)
        } finally {
            setLoading(false);
        }

    }

    const handleDelete = async (e) => {
    }

    return (
        <div className="my-5">
            <Card className="w-full">
                <Form
                    className="w-full justify-center items-center space-y-4 p-4"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full flex flex-col gap-3 ">
                        <Input
                            fullWidth
                            isRequired
                            label="Başlık"
                            labelPlacement="outside"
                            value={baslik}
                            onValueChange={setBaslik}
                        />

                        <Textarea
                            fullWidth
                            className='mt-3'
                            label="Açıklama"
                            labelPlacement="outside"
                            maxLength={160}
                            value={aciklama}
                            onValueChange={setAciklama}
                        />

                        <ImageInput resimPreview={resimPreview} mevcutResimUrl={mevcutResimUrl} setResimFile={setResimFile} setResimPreview={setResimPreview} setError={setError} />

                        <Input
                            type="number"
                            pattern="^\d+([.,]\d+)?$"
                            isRequired
                            inputMode='decimal'
                            className="w-full"
                            max={999}
                            min={0}
                            labelPlacement="outside"
                            label="Fiyat"
                            value={fiyat}
                            onValueChange={setFiyat}
                        />

                        <Select
                            fullWidth
                            isRequired
                            label="Kategori"
                            labelPlacement="outside"
                            selectedKeys={new Set([secilenKategori])}
                            onSelectionChange={(keys) => setSecilenKategori(Array.from(keys)[0])}
                        >
                            {kategoriler.map((k) => (
                                <SelectItem key={k.id.toString()} textValue={k.isim}> {k.isim} </SelectItem>
                            ))}
                        </Select>


                        {error && <p className="text-danger text-center mt-1">{error}</p>}
                        {success && <p className="text-success-800 text-center mt-1">Ürün başarıyla güncellendi.</p>}

                        <Button className="w-full mt-3" size="md" color="primary" type="submit" spinnerPlacement="end" isLoading={loading}>Güncelle</Button>

                    </div>
                </Form>
            </Card>
        </div>
    );
}

"use client"
import { Button } from '@heroui/button';
import { Card } from '@heroui/card'
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';
import { useRouter } from 'next/navigation';
import React from 'react';
import ImageInput from '@/components/ImageInput/ImageInput';

export default function UrunOlusturCard({ kategoriler, handleCreate }) {
    const [secilenKategori, setSecilenKategori] = React.useState("");
    const [baslik, setBaslik] = React.useState("");
    const [aciklama, setAciklama] = React.useState("");
    const [fiyat, setFiyat] = React.useState();
    const [resimFile, setResimFile] = React.useState(null);
    const [resimPreview, setResimPreview] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const router = useRouter();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            var data = {
                baslik,
                aciklama,
                fiyat: parseFloat(fiyat),
                resim: resimFile ? resimFile : null,
                kategori_id: parseInt(secilenKategori)
            }

            const result = await handleCreate(data);
            if (result.error) {
                console.error('Ürün oluşturulurken hata oluştu', result.error);
                setError(result.error);
            } else {
                setError(false);
                setSuccess(true);
                setTimeout(() => {
                    router.push(`/yonetim/urunler/${secilenKategori}`);
                }, 500)
            }

        } catch (error) {
            console.error('Hata:', error);
            setError(true);
            alert('Beklenmeyen bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <Card className="p-5 pt-2 mt-4 w-96">
                <Form
                    className="w-full justify-center items-center space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full flex flex-col gap-3 ">
                        <Input
                            fullWidth
                            isRequired
                            label="Başlık"
                            labelPlacement="outside"
                            name="baslik"
                            type="text"
                            value={baslik}
                            onValueChange={setBaslik}
                        />

                        <Textarea
                            fullWidth
                            className='mt-3'
                            label="Açıklama"
                            labelPlacement="inside"
                            name="aciklama"
                            maxLength={160}
                            value={aciklama}
                            onValueChange={setAciklama}
                        />

                        <ImageInput onChange={handleFileChange} />
                           
                            {/* Resim önizleme */}
                            {resimPreview && (
                                <div className="mx-auto">
                                    <img
                                        src={resimPreview}
                                        alt="Önizleme"
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <p className='text-center text-xs mt-1 text-gray-400'>Önizleme</p>
                                </div>
                            )}

                        <NumberInput
                        required
                            inputMode='decimal'
                            hideStepper
                            className="w-full"
                            minValue={0}
                            maxValue={9999}
                            labelPlacement="outside"
                            label="Fiyat"
                            name='fiyat'
                            value={fiyat}
                            onValueChange={setFiyat}
                        />

                        <Select
                            fullWidth
                            isRequired
                            label="Kategori"
                            labelPlacement="outside"
                            name="kategori"
                            selectedKeys={secilenKategori ? new Set([secilenKategori]) : new Set()}
                            onSelectionChange={(keys) => setSecilenKategori(Array.from(keys)[0])}
                        >
                            {kategoriler.map((kategori) => (
                                <SelectItem key={kategori.id.toString()} textValue={kategori.isim}>
                                    {kategori.isim}
                                </SelectItem>
                            ))}
                        </Select>


                        {success && <p className="text-success-800 text-center mt-1">Ürün Oluşturuldu.</p>}
                        {error && <p className="text-danger text-center mt-1">Hata Oluştu. {error}</p>}

                        <div className="flex gap-4 items-center">
                            <Button className="w-full mt-3" size="md" color="primary" type="submit" spinnerPlacement="end" isLoading={loading}>
                                Oluştur
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

        </>
    )
}

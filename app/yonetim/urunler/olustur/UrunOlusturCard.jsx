"use client"
import { Button } from '@heroui/button';
import { Card } from '@heroui/card'
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';
import { useRouter } from 'next/navigation';
import React from 'react';

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

                        <div className="flex items-center justify-center w-full">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Resim yüklemek için tıkla</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 px-3">JPG, PNG veya WeBP, maksimum 5MB</p>
                                    </div>
                                    <input id='dropzone-file' type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required />
                                </label>
                            </div>


                           
                            {/* Resim önizleme */}
                            {resimPreview && (
                                <div className="ml-2">
                                    <img
                                        src={resimPreview}
                                        alt="Önizleme"
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                    <p className='text-center text-xs mt-1 text-gray-400'>Önizleme</p>
                                </div>
                            )}
                        </div>

                        <NumberInput
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

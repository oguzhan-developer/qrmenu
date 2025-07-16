"use client"

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import React from "react";
import ImageInput from "@/components/ImageInput/ImageInput";

export default function KategoriEkleCard({ handleCreate }) {
    const [resimFile, setResimFile] = React.useState(null);
    const [resimPreview, setResimPreview] = React.useState(null);

    const [isim, setIsim] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
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
                isim,
                resim: resimFile ? resimFile : null,
            }

            const result = await handleCreate(data);
            if (result.error) {
                console.error('Ekleme hatası:', result.error);
                setError(true);
            } else {
                setError(false);
                router.push('/yonetim/kategoriler');
            }

        } catch (error) {
            console.error('Hata:', error);
            setError(true);
            alert('Ekleme sırasında hata oluştu!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <Card className="w-full">
                <Form
                    className="w-full justify-center items-center space-y-4 p-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-4">
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
                                    src={resimPreview}
                                    alt="Önizleme"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                                <p className='text-center text-xs mt-1 text-gray-400'>Önizleme</p>
                            </div>
                        )}

                        {error && <span className="text-danger text-small">Hata Oluştu. {error}</span>}

                        <div className="flex gap-4 items-center">
                            <Button className="w-full" color="primary" type="submit" spinnerPlacement="end" isLoading={loading} size="sm">
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
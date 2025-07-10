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
    const [resim, setResim] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            var data = {
                baslik,
                aciklama,
                fiyat: parseFloat(fiyat),
                resim,
                kategori_id: parseInt(secilenKategori)
            }

            const result = await handleCreate(data);
            if (result.error) {
                console.error('Ürün oluşturulurken hata oluştu', result.error);
                setError(true);
            } else {
                setError(false);
                setSuccess(true);
                setTimeout(() => {
                    router.push('/yonetim/urunler');
                }, 500)
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
                        <Input
                            fullWidth
                            isRequired
                            label="Resim"
                            labelPlacement="outside"
                            name="aciklama"
                            type="text"
                            value={resim}
                            onValueChange={setResim}
                        />
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

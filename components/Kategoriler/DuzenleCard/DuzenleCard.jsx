"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { updateKategori, removeKategori } from "@/lib/database";
import { useRouter } from "next/navigation";

export default function DuzenleCard({ item, kategoriler }) {
    const [isim, setIsim] = React.useState(item.isim || "");
    const [resim, setResim] = React.useState(item.resim || "");
    const [sira, setSira] = React.useState(item.sira.toString() || "");
    const [loading, setLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState(false);

    const [error, setError] = React.useState(false);
    const router = useRouter();
    const siralar = kategoriler
        .map(kategori => kategori.sira)
        .sort((a, b) => a - b);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            var updateData = {}
            if (item.sira === parseInt(sira)) {
                updateData = {
                    changeSira: false,
                    isim: isim,
                    resim: resim,
                    sira: parseInt(sira)
                };
            } else {
                updateData = {
                    changeSira: true,
                    oncekiSira: item.sira,
                    isim: isim,
                    resim: resim,
                    sira: parseInt(sira)
                }
            }

            const result = await updateKategori(item.id, updateData);

            if (result.error) {
                console.error('Güncelleme hatası:', result.error);
                setError(true);
            } else {
                setError(false);
                router.push('/yonetim/kategoriler');
            }
        } catch (error) {
            console.error('Hata:', error);
            setError(true);
            alert('Güncelleme sırasında hata oluştu!');
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
            const result = await removeKategori(item.id);

            if (result.error) {
                console.error('Silme hatası:', result.error);

                if (result.error.code === 'CATEGORY_HAS_PRODUCTS') {
                    alert('Bu kategoriye ait ürünler mevcut. Önce ürünleri silin.');
                } else {
                    alert('Silme sırasında hata oluştu!');
                }

                setError(true);
            } else {
                alert('Kategori başarıyla silindi!');
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

                        <Input
                            isRequired
                            label="Resim"
                            labelPlacement="outside"
                            name="resim"
                            type="text"
                            value={resim}
                            onValueChange={setResim}
                        />

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
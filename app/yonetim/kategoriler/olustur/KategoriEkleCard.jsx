"use client"

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import React from "react";
import { createKategori } from "@/lib/database";

export default function KategoriEkleCard() {

    const [isim, setIsim] = React.useState("");
    const [resim, setResim] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            var data = {
                isim,
                resim,
            }

            const result = await createKategori(data);
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

                        <Input
                            isRequired
                            label="Resim"
                            labelPlacement="outside"
                            name="resim"
                            type="text"
                            value={resim}
                            onValueChange={setResim}
                        />


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
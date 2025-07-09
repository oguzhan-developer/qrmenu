"use client"

import React from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { useRouter } from "next/navigation";
export default function BannerDuzenle({ duyuru, duyuruSubmit }) {
    const router = useRouter();
    const { duyuruMesaj, isDuyuruAktif } = duyuru;

    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [mesaj, setMesaj] = React.useState(duyuruMesaj);
    const [isAktif, setIsAktif] = React.useState(isDuyuruAktif);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        try {
            if(mesaj.length >59){
                setError("Duyuru mesajı 60 karakterden uzun olamaz.");
                return;
            }
            const newData = {
                duyuruMesaj: mesaj,
                isDuyuruAktif: isAktif
            }
            const result = await duyuruSubmit(newData);
            if (result.error) {
                console.error('Duyuru Düzenleme hatası:', result.error);
                setError(true);
            } else {
                setError(false);
            }
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/yonetim/');
                }, 500);
            }
        }
        catch (error) {
            console.error('Hata:', error);
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full flex flex-col items-center mt-5">
                <Card className="w-96">
                    <Form
                        className="w-full justify-center items-center space-y-4 p-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-4 w-full ">
                            <Input
                                maxLength={59}
                                isRequired
                                label="Duyuru Mesajı"
                                labelPlacement="outside"
                                name="duyuru"
                                type="text"
                                value={mesaj}
                                onValueChange={setMesaj}
                                
                            />
                            <Switch isSelected={isAktif} onValueChange={setIsAktif}>
                                <span className={isAktif ? "text-black-500" : "text-gray-300"}>
                                    Duyuru Aktifliği
                                </span>
                            </Switch>

                            {error && <span className="text-danger text-small">{error}</span>}

                            <div className="flex gap-4 items-center">
                                <Button fullWidth color="primary" type="submit" isDisabled={loading} spinnerPlacement="end" isLoading={loading} size="sm">
                                    Kaydet
                                </Button>
                            </div>
                        </div>


                        {success && (
                            <div className="text-small text-success-800 mt-4">
                                <pre> Duyuru güncellendi</pre>
                            </div>
                        )}
                    </Form>

                </Card>
            </div>
        </>
    )
}
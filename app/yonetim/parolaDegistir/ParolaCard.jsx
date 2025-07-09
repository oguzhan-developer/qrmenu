"use client"
import React from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
export default function ParolaCard({ handleSubmit }) {
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [parola, setParola] = React.useState("");
    const router = useRouter();

    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        try {
            const result = await handleSubmit(parola);
            if (result.error) {
                console.error('Parola Değiştirme hatası:', result.error);
                setError(result.error);
            }
            else {
                setError(false);
                if(result.success) {
                    setSuccess(true);
                    setTimeout(() => {
                        router.push("/yonetim/")
                    }, 500);
                }
            }
        } catch (error) {
            console.error('Hata:', error);
            setError(true);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center mt-5">
                <Card className="w-80">
                    <Form
                        className="w-full justify-center items-center space-y-4 p-4"
                        onSubmit={formSubmit}
                    >
                        <div className="flex flex-col gap-4 w-full ">
                            <Input
                                minLength={5}
                                maxLength={20}
                                isRequired
                                label="Yeni Parola"
                                labelPlacement="outside"
                                name="duyuru"
                                type="password"
                                value={parola}
                                onValueChange={setParola}
                            />


                            {error && <span className="text-danger text-small">{error}</span>}

                            <div className="flex gap-4 items-center">
                                <Button fullWidth color="primary" type="submit" isDisabled={loading} spinnerPlacement="end" isLoading={loading} size="sm">
                                    Kaydet
                                </Button>
                            </div>
                        </div>

                        {success && (
                            <div className="text-small text-success-800 mt-4">
                                <pre>Parola güncellendi.</pre>
                            </div>
                        )}
                    </Form>

                </Card>
            </div>
        </>
    )
}
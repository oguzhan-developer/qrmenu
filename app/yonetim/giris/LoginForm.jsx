"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import React from "react";

export default function LoginForm({ handleLogin, redirectTo }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [parola, setParola] = React.useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append('parola', parola);

        const result = await handleLogin(formData);

        if (result?.error) {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center mt-20">
            <Card className="w-96">
                <Form
                    className="w-full justify-center items-center space-y-4 p-6"
                    onSubmit={onSubmit}
                >
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-xl font-bold text-center mb-4">
                            Yönetim Paneli Girişi
                        </h2>

                        <Input
                            isRequired
                            label="Parola"
                            labelPlacement="outside"
                            name="parola"
                            type="password"
                            value={parola}
                            onValueChange={setParola}
                            placeholder="Parolanızı girin"
                        />

                        {error && (
                            <span className="text-danger text-small">{error}</span>
                        )}

                        <Button
                            fullWidth
                            color="primary"
                            type="submit"
                            isLoading={loading}
                            disabled={loading}
                            size="lg"
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </Button>

                        {redirectTo !== '/yonetim' && (
                            <p className="text-small text-center text-default-500">
                                Giriş yaptıktan sonra {redirectTo} sayfasına yönlendirileceksiniz
                            </p>
                        )}
                    </div>
                </Form>
            </Card>
        </div>
    );
}
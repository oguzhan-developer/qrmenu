"use client"
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import Link from "next/link";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
export default function KategorilerCard({ kategoriler }) {
    const [secilenKategori, setSecilenKategori] = React.useState("1");
    return (<div className="mt-5">
        <Card className="p-5">
           
            <p className="font-bold text-sm mb-3 mt-2">Ürünleri görüntülemek için kategori seçiniz.</p>

            <Select
            className="mb-3"
            aria-label="Kategori Seç"
                fullWidth
                isRequired
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
                <Button as={Link} href={`/yonetim/urunler/${secilenKategori}`} className="m-2 text-medium" color="primary">
                Ürünleri Görüntüle
                </Button>
            <Divider className="my-5" />
             <Button as={Link} color="primary" href="/yonetim/urunler/olustur" className="m-2 text-medium">Ürün Oluştur</Button>
        </Card>

    </div>)
}
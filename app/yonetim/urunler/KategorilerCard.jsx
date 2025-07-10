import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import Link from "next/link";
import {Divider} from "@heroui/divider";
export default function KategorilerCard({ kategoriler }) {
    return (<div className="mt-5">
        <Card className="p-5">
            <Button as={Link} variant="faded" href="/yonetim/urunler/olustur">Ürün Oluştur</Button>
            <Divider className="my-3"/>
            <p className="font-bold text-sm mb-3">Ürünleri görüntülemek için kategori seçiniz.</p>
            {kategoriler.map((kategori) => (
                <Button as={Link} href={`/yonetim/urunler/${kategori.id}`}
                 key={kategori.id} className="m-2 text-medium" color="primary">{kategori.isim}</Button>
            ))}
        </Card>

    </div>)
}
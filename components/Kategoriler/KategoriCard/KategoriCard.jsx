import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";

export default function KategoriCard({ title, image, id }) {
    
    return (
        <Link href={`/kategori/${id}`} prefetch className="block transition-all duration-150 ease-out transform active:scale-90 active:rotate-1" >
            <Card isFooterBlurred isBlurred className="border-none items-center w-full max-w-[200px] mx-auto" radius="lg">
                <Image
                    alt={title}
                    className="object-cover"
                    height={200}
                    src={`/kategoriler/${image}.webp`}
                    width={200}
                    draggable={false}
                    isZoomed
                />
                <CardFooter style={{ width: "95% !important" }} className="before:bg-white/10 justify-center border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small z-10 m-0 bg-slate-600">
                    <p className="text-center text-white/80" >{title}</p>
                </CardFooter>
            </Card>
        </Link>
    );
}

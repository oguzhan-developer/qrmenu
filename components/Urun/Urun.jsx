"use client"
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { useRouter } from 'next/navigation'

export default function Urun({ title, image, url }) {
    const router = useRouter()

    return (
        <Card isFooterBlurred isPressable onPress={() => {router.push(`urun/${url}`) }} className="border-none items-center w-full max-w-[200px] mx-auto select-none" radius="lg">
            <Image
                alt="Woman listing to music"
                className="object-cover pointer-events-none"
                height={200}
                src={`${image}.jpg`}
                width={200}
                draggable={false}
                isZoomed
            />
            <CardFooter style={{ width: "96% !important" }} className="before:bg-white/10 justify-center border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small z-10 m-0 bg-slate-600">
                <p className="text-center text-white/80">{title}</p>
                {/* <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Notify me
        </Button> */}
            </CardFooter>
        </Card>
    );
}

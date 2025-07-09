import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import Styles from "./style.module.css"
export default function UrunCard({ title, desc, price, image }) {

    return (
        <>
            <Card radius="sm" shadow="sm" className={`${Styles.card} block my-2 p-2 h-70 max-w-[800px] mx-auto`}>
                <div className="flex flex-row h-36">
                    <div className="min-w-[120px] my-auto">
                        {
                            image && (
                                <Image
                                    alt="cay"
                                    className="object-cover"
                                    height={130}
                                    src={`/urunler/${image}.webp`}
                                    width={120}
                                    draggable={false}
                                    radius="sm"
                                />
                            )
                        }
                    </div>
                    <div className="flex flex-col justify-between py-2 pl-4 pr-0 select-none">
                            <div>
                                <p className="font-bold text-medium">{title}</p>
                                <p className="text-sm line-clamp-2 capitalize" style={{ lineHeight: "1.1rem" }}>{desc}</p>
                            </div>
                            <div className="pt-5">
                                <p className="font-bold text-medium ">{price.toString().replace('.',',')} ₺</p>
                            </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
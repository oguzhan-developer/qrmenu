import { Card } from "@heroui/card";
import { Image } from "@heroui/image";

export default function UrunCard({ title, image, url }) {
    image = "aa"
    return (
        <>
            <Card isHoverable radius="sm" shadow="sm" className="block my-2 p-2 h-70">
                <div className="flex flex-row h-36">
                    <div className="min-w-[120px] my-auto">
                        {
                            image && (
                                <Image
                                    alt="cay"
                                    className="object-cover"
                                    height={130}
                                    src={`/cay.jpg`}
                                    width={120}
                                    draggable={false}
                                    radius="sm"
                                />
                            )
                        }
                    </div>
                    <div className="flex flex-col justify-around pl-4 pr-0">
                        <div>
                            <div>
                                <p className="font-bold text-medium">Espresso</p>
                                <p className="text-sm line-clamp-2 capitalize" style={{ lineHeight: "1.1rem" }}>İmza espresso shot'umuz, mükemmel bir şekilde demlenmiş, cesur ve yoğun bir tat profili sunarak mükemmel bir şekilde demlenmiş.
                                </p>
                            </div>
                            <div>
                                <p className="font-bold text-medium ">120,00 ₺</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
export default function Urun({ title, image }) {
    return (
        <Card isFooterBlurred isHoverable isPressable className="border-none items-center w-full max-w-[200px] mx-auto" radius="lg">
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={`${image}.jpg`}
                width={200}
            />
            <CardFooter style={{ width: "96% !important" }} className="before:bg-white/10 justify-center border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small z-10  m-0">
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

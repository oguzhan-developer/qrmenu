import { Link } from "@heroui/link";
import { MenuIcon } from "@/public/icon.jsx";
import { Button } from "@heroui/button";
export default function YonetimSayfaButton() {
    return (
        <Button
            as={Link}
            href="/yonetim"
            isIconOnly
            className="size-10 ml-2"
            aria-label="Yonetim Menusu"
            variant="light"
            color="primary"
        >
            <MenuIcon />
        </Button>
    )
}

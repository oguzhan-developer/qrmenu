import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import { Card } from "@heroui/card";

export default async function KategoriDuzenle({ params }) {
    const { id } = await params;

    return (<>
                <TopNavbar title="Kategori Düzenle" />
                <div className="my-auto mt-5">

                <Card >
                    Deneme
                </Card>
                </div>
    </>)
}
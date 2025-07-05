import Banner from "@/components/Banner/Banner";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Urun from "@/components/Urun/Urun";
import { getKategoriler } from "@/lib/database";
export default async function Home() {
  const kategoriler = await getKategoriler();
  console.log(kategoriler);
  
  return (
    <>
    <TopNavbar pathname="/" />
    <Banner />
    <div className="grid grid-cols-2 justify-center gap-4 max-w-fit mx-3 m-auto max-h-fit mt-5 ">
      {
        kategoriler.map((kategori) =>
           (<Urun key={kategori.id} id={kategori.id} title={kategori.isim} image={kategori.resim} />))
      }
    </div>

      </>
  );
}

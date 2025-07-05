import Banner from "@/components/Banner/Banner";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Urun from "@/components/Urun/Urun";
export default function Home() {
  return (
    <>
    <TopNavbar pathname="/" />
    <Banner />
    <div className="grid grid-cols-2 justify-center gap-4 max-w-fit mx-3 m-auto max-h-fit mt-5 ">
    <Urun title="Sıcak İçecekler" image="sicak" url="sicaklar" />
    <Urun title="Soğuk İçecekler" image="soguk" url="soguklar" />
    <Urun title="Aperatifler" image="aperatifler" url="aperatifler" />
    <Urun title="Tatlılar" image="ekler"/>
    </div>

      </>
  );
}

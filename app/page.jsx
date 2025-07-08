import Banner from "@/components/Banner/Banner";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Kategoriler from "@/components/Kategoriler/KategorilerCard/KategorilerCard";
export default async function Home() {
  
  return (
    <>
    <TopNavbar />
    <Banner />
    <Kategoriler />
      </>
  );
}

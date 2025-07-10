export const revalidate = 0
export const dynamic = 'force-dynamic'

import Banner from "@/components/Banner/Banner";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Kategoriler from "@/components/KategorilerCard/KategorilerCard";

export default async function Home() {
  return (
    <>
    <TopNavbar />
    <Banner />
    <Kategoriler />
      </>
  );
}

import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx"
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import Styles from "./style.module.css"
import UrunCard from "../../../components/UrunCard/UrunCard";

export default async function UrunPage({ params }) {
    const { id } = await params;
    return (
        <>
            <TopNavbar pathname={`/urun/${id}`} />
            <div className={`${Styles.container} justify-center m-auto mt-2`}>
                <UrunCard title="Espresso" image="kahve" price="80,00" desc="İmza espresso shot'umuz, mükemmel bir şekilde demlenmiş, cesur ve yoğun bir tat profili sunarak mükemmel bir şekilde demlenmiş."/>
                <UrunCard title="Double Espresso" image="doublees" price="100,00" desc="Klasik espresso shot'umuzun iki katı, ekstra kafein vuruşu arayanlar için."/>
                <UrunCard title="Cappuccino" image="cappuc" price="125,00" desc="Espresso, buharlı süt ve köpüklü mikroköpük üçlüsünün harmonik bir birleşimi, kakao serpmesi ile süslenmiş."/>
                <UrunCard title="Flat White" price="130,00" image="flatw" desc="Klasik bir Avustralya favorisi, espresso ve kadifemsi mikroköpükün dengeli ve kadifemsi lezzetini birleştirir."/>
                <UrunCard title="Maccihato" price="130,00" image="macch" desc='Espresso, bir yudum köpüklü süt ile "lekenmiş", kremamsı bir tat ile cesur bir kahve tadı sunar.'/>
            </div>
        </>
    )
}
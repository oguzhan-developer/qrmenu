import Banner from "@/components/Banner/Banner";
import Urun from "@/components/Urun/Urun";
import {Divider} from "@heroui/divider";
export default function Home() {
  return (
    <>
    <Banner />
    {/* <Divider className="my-2"/> */}
    <div className="grid grid-cols-2 justify-center gap-4 max-w-md m-auto my-2">
    <Urun title="Sıcak İçecekler" image="cay" />
    <Urun title="Tatlılar" image="ekler"/>
    <Urun title="Sıcak İçecekler" image="cay" />
    <Urun title="Tatlılar" image="ekler"/>
    </div>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
    <p className="mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugit maiores blanditiis hic excepturi officiis consequatur odit nisi,
      labore, ex cupiditate quisquam dolor sequi natus, assumenda molestiae
      voluptatum architecto recusandae atque!</p>
      </>
  );
}
